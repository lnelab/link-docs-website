<script setup>
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'

// generated from lnelab/dfu-package by scripts/sync-dfu.mjs
const INDEX_URL = withBase('/dfu/index.json')
const REPOSITORY = 'https://github.com/lnelab/dfu-package'

const strings = {
    zh: {
        loading: '正在载入固件列表…',
        failed: '无法载入固件列表',
        repository: 'GitHub 仓库',
        failedTail: '获取。',
        version: '版本',
        released: '发布于',
        history: '历史版本',
        open: '（',
        close: '）',
        master: '左 / Left',
        slave: '右 / Right'
    },
    en: {
        loading: 'Loading the firmware list…',
        failed: 'Cannot load the firmware list',
        repository: 'GitHub repository',
        failedTail: 'instead.',
        version: 'Version',
        released: 'Released',
        history: 'Previous versions',
        open: ' (',
        close: ')',
        master: 'Left',
        slave: 'Right'
    }
}

const { lang } = useData()
const text = computed(() => (lang.value ?? '').toLowerCase().startsWith('zh') ? strings.zh : strings.en)

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

    return `${model.name}${text.value.open}${model.half === 'master' ? text.value.master : text.value.slave}${text.value.close}`
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
        <p v-if="loading" class="dfu-note">{{ text.loading }}</p>

        <p v-else-if="error" class="dfu-note">
            {{ text.failed }}{{ text.open }}{{ error }}{{ text.close }}
            <a :href="REPOSITORY" target="_blank" rel="noreferrer">{{ text.repository }}</a>
            {{ text.failedTail }}
        </p>

        <template v-else>
            <section v-for="model in available" :key="model.id" class="dfu-item">
                <h3 class="dfu-name">{{ modelName(model) }}</h3>

                <p class="dfu-note">
                    {{ text.version }} <strong>{{ model.latest.release }}</strong>
                    · {{ text.released }} {{ model.latest.date }}
                    · {{ size(model.latest.size) }}
                    · sha256 <code :title="model.latest.sha256">{{ model.latest.sha256.slice(0, 12) }}</code>
                </p>

                <p class="dfu-action">
                    <a :href="fileUrl(model.latest.file)" :download="model.latest.file">{{ model.latest.file }}</a>
                </p>

                <details v-if="model.history.length" class="dfu-history">
                    <summary>{{ text.history }}{{ text.open }}{{ model.history.length }}{{ text.close }}</summary>
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
