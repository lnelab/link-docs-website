import { defineConfig } from 'vitepress'

export const shared = defineConfig({
    title: 'LINK',

    rewrites: {
        'zh/:rest*': ':rest*'
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/link-logo.svg' }],
    ],

    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/lnelab' }
        ]
    }
})