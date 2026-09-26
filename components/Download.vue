<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

// generated from lnelab/dfu-package by scripts/sync-dfu.mjs
const INDEX_URL = withBase('/dfu/index.json')
const REPOSITORY = 'https://github.com/lnelab/dfu-package'

const index = ref(null)
const error = ref('')
const loading = ref(true)

onMounted(async () => {
    try {
        const response = await fetch(INDEX_URL, { cache: 'no-cache' })

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        index.value = await response.json()
    } catch (cause) {
        error.value = cause.message
    } finally {
        loading.value = false
    }
})

const models = computed(() =>
    Object.entries(index.value?.models ?? {}).map(([id, model]) => ({
        id,
        name: model.name,
        half: model.half,
        latest: model.latest,
        history: (model.history ?? []).slice(1)
    }))
)

const available = computed(() => models.value.filter(model => model.latest))

function modelName(model) {
    if (!model.half) return model.name

    return `${model.name}（${model.half === 'master' ? '左 / Left' : '右 / Right'}）`
}

function size(bytes) {
    if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`

    return `${Math.round(bytes / 1024)} KB`
}

function fileUrl(file) {
    return withBase(`/dfu/${file}`)
}
</script>

<template>
    <div class="dfu">
        <p v-if="loading" class="dfu-note">正在载入固件列表…</p>

        <p v-else-if="error" class="dfu-note">
            无法载入固件列表（{{ error }}），请前往
            <a :href="REPOSITORY" target="_blank" rel="noreferrer">GitHub 仓库</a>
            获取。
        </p>

        <template v-else>
            <section v-for="model in available" :key="model.id" class="dfu-item">
                <h3 class="dfu-name">{{ modelName(model) }}</h3>

                <p class="dfu-note">
                    版本 <strong>{{ model.latest.release }}</strong>
                    · 发布于 {{ model.latest.date }}
                    · {{ size(model.latest.size) }}
                    · sha256 <code :title="model.latest.sha256">{{ model.latest.sha256.slice(0, 12) }}</code>
                </p>

                <p class="dfu-action">
                    <a class="dfu-download" :href="fileUrl(model.latest.file)" :download="model.latest.file">
                        下载 {{ model.latest.file }}
                    </a>
                </p>

                <details v-if="model.history.length" class="dfu-history">
                    <summary>历史版本（{{ model.history.length }}）</summary>
                    <ul>
                        <li v-for="item in model.history" :key="item.file">
                            <a :href="fileUrl(item.file)">{{ item.release }}</a>
                            <span class="dfu-note"> · {{ item.date }} · {{ size(item.size) }} · {{ item.file }}</span>
                        </li>
                    </ul>
                </details>
            </section>
        </template>
    </div>
</template>

<style scoped>
.dfu-item {
    padding-bottom: 12px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--vp-c-divider);
}

.dfu-item:last-of-type {
    border-bottom: none;
}

.dfu-name {
    margin: 0 0 6px;
    padding-top: 0;
    font-size: 18px;
    border-top: none;
}

.dfu-note {
    margin: 4px 0;
    font-size: 14px;
    color: var(--vp-c-text-2);
}

.dfu-note code {
    font-size: 13px;
}

.dfu-action {
    margin: 10px 0;
}

.dfu-download {
    display: inline-block;
    padding: 6px 14px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
    border: 1px solid var(--vp-c-brand-1);
    border-radius: 6px;
    transition: background-color 0.2s, color 0.2s;
}

.dfu-download:hover {
    color: #fff;
    background-color: var(--vp-c-brand-1);
}

.dfu-history {
    margin-top: 10px;
    font-size: 14px;
}

.dfu-history summary {
    cursor: pointer;
    color: var(--vp-c-text-2);
}

.dfu-history ul {
    margin: 8px 0 0;
    padding-left: 20px;
}

.dfu-history li {
    margin: 4px 0;
}
</style>
