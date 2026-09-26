#!/usr/bin/env node
/**
 * Sync the DFU index and the firmware packages into public/dfu/.
 *
 * Runs before every build (npm prebuild) so the deployed site always serves the
 * packages that are listed in https://github.com/lnelab/dfu-package. The source
 * of truth stays in that repository; this only copies it into the build output
 * so users can download from www.lnelab.com instead of raw.githubusercontent.com.
 *
 * Every package is verified against the size and sha256 recorded in index.json,
 * and the build fails when something does not match.
 *
 * Usage:
 *   node scripts/sync-dfu.mjs
 *   node scripts/sync-dfu.mjs --base https://cdn.jsdelivr.net/gh/lnelab/dfu-package@main/
 */
import { createHash } from 'node:crypto'
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TARGET = join(ROOT, 'public', 'dfu')
const DEFAULT_BASE = 'https://raw.githubusercontent.com/lnelab/dfu-package/main/'

const args = process.argv.slice(2)
const baseFlag = args.indexOf('--base')
const base = baseFlag === -1 ? DEFAULT_BASE : args[baseFlag + 1]

if (!base?.startsWith('http')) {
    console.error('[sync-dfu] --base needs an url prefix, e.g. https://example.com/packages/')
    process.exit(1)
}

function fail(message) {
    // throwing keeps node from exiting while fetch handles are still open
    throw new Error(message)
}

function sha256(buffer) {
    return createHash('sha256').update(buffer).digest('hex')
}

function humanSize(bytes) {
    return `${Math.round(bytes / 1024)} KB`
}

async function download(url) {
    const attempts = 3

    for (let attempt = 1; attempt <= attempts; attempt++) {
        let response = null
        let reason = ''

        try {
            response = await fetch(url, { redirect: 'follow' })
        } catch (error) {
            reason = error.message
        }

        if (response?.ok) return Buffer.from(await response.arrayBuffer())

        // a missing file will not appear on a retry, only server errors might
        if (response && response.status < 500) fail(`${url} responded with HTTP ${response.status}`)
        if (attempt === attempts) fail(`cannot download ${url}: ${reason || `HTTP ${response.status}`}`)

        console.log(`[sync-dfu] retrying ${url} (${reason || `HTTP ${response.status}`}, ${attempt}/${attempts})`)
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt))
    }
}

async function main() {
    console.log(`[sync-dfu] source: ${base}`)

    const indexBuffer = await download(`${base}index.json`)
    const index = JSON.parse(indexBuffer.toString('utf8'))
    const models = Object.entries(index.models ?? {})

    if (!models.length) fail('index.json does not contain any model')

    const packages = new Map()

    for (const [, model] of models) {
        for (const item of model.history ?? []) {
            if (item?.file && !packages.has(item.file)) packages.set(item.file, item)
        }
    }

    mkdirSync(TARGET, { recursive: true })

    let done = 0

    for (const [file, item] of packages) {
        const buffer = await download(`${base}${file}`)

        if (buffer.length !== item.size) {
            fail(`${file} is ${buffer.length} bytes, index.json says ${item.size}`)
        }

        const digest = sha256(buffer)

        if (digest !== item.sha256) {
            fail(`${file} sha256 is ${digest}, index.json says ${item.sha256}`)
        }

        writeFileSync(join(TARGET, file), buffer)
        console.log(`[sync-dfu] ${++done}/${packages.size} ${file} (${humanSize(buffer.length)})`)
    }

    // served to the app and to the download page
    writeFileSync(join(TARGET, 'index.json'), indexBuffer)

    // drop packages that are no longer listed
    for (const name of readdirSync(TARGET).filter(name => name.endsWith('.zip'))) {
        if (!packages.has(name)) {
            rmSync(join(TARGET, name))
            console.log(`[sync-dfu] removed stale ${name}`)
        }
    }

    const modelsWithPackages = models.filter(([, model]) => model.latest).length

    console.log(`[sync-dfu] ${packages.size} package(s) for ${modelsWithPackages}/${models.length} model(s) are ready in public/dfu/`)
}

try {
    await main()
} catch (error) {
    console.error(`\n[sync-dfu] ${error.message}\n`)
    process.exitCode = 1
}
