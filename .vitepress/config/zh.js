import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'LINK 站点',

    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '向导', link: '/guide/remap' },
            { text: '固件升级库', link: '/resource/dfu-package' },
            { text: '即刻尝试', link: 'https://link.lnelab.com' }
        ],

        sidebar: {
            '/guide/': { base: '/guide/', items: sidebarGuide() },
            '/resource/': { base: '/resource/', items: sidebarResource() }
        },

        editLink: {
            pattern: 'https://github.com/lnelab/link-docs-website/edit/main/:path',
            text: '在 GitHub 上编辑此页面'
        },

        footer: {
            message: '',
            copyright: `Copyright © ${new Date().getFullYear()} LNE LAB`
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        skipToContentLabel: '跳转到内容'
    }
})

function sidebarGuide() {
    return [
        {
            text: '介绍',
            items: [
                { text: 'LINK 是什么', link: 'what-is-link' },
                { text: '快速开始', link: 'getting-started' },
                { text: '关于我们', link: 'about-us' },
            ]
        },
        {
            text: '向导',
            items: [
                { text: '按键映射', link: 'remap' },
                { text: '层级', link: 'layers' },
                { text: '宏', link: 'macros' },
                { text: '布局', link: 'layouts' },
                { text: '设备信息', link: 'device' },
                { text: '固件升级', link: 'dfu' }
            ]
        },
        {
            text: '进阶',
            items: [
                { text: '定义', link: 'definition' }
            ]
        },
        {
            text: '变更日志',
            items: [
                { text: 'v4', link: 'v4' },
                { text: 'v3', link: 'v3' },
            ]
        }
    ]
}

function sidebarResource() {
    return [
        {
            text: '资源',
            items: [
                { text: '固件升级库', link: 'dfu-package' }
            ]
        }
    ]
}