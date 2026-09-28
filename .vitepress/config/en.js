import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export const en = defineConfig({
    lang: 'en-US',
    description: 'LINK Documentation',

    themeConfig: {
        nav: [
            { text: 'Home', link: '/en/' },
            { text: 'Guide', link: '/en/guide/remap' },
            { text: 'Firmware library', link: '/en/resource/dfu-package' },
            { text: 'Try now', link: 'https://link.lnelab.com' }
        ],

        sidebar: {
            '/en/guide/': { base: '/en/guide/', items: sidebarGuide() },
            '/en/resource/': { base: '/en/resource/', items: sidebarResource() }
        },

        editLink: {
            pattern: 'https://github.com/lnelab/link-docs-website/edit/main/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            message: '',
            copyright: `Copyright © ${new Date().getFullYear()} LNE LAB`
        },

        docFooter: {
            prev: 'Previous page',
            next: 'Next page'
        },

        outline: {
            label: 'On this page'
        },

        lastUpdated: {
            text: 'Last updated',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: 'Language',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        skipToContentLabel: 'Skip to content'
    }
})

function sidebarGuide() {
    return [
        {
            text: 'Introduction',
            items: [
                { text: 'What is LINK', link: 'what-is-link' },
                { text: 'Getting started', link: 'getting-started' },
                { text: 'About us', link: 'about-us' },
            ]
        },
        {
            text: 'Guide',
            items: [
                { text: 'Key remapping', link: 'remap' },
                { text: 'Layers', link: 'layers' },
                { text: 'Macros', link: 'macros' },
                { text: 'Layouts', link: 'layouts' },
                { text: 'Firmware update', link: 'dfu' },
                { text: 'Device information', link: 'device' },
                { text: 'Bluetooth', link: 'bluetooth' }
            ]
        },
        {
            text: 'Advanced',
            items: [
                { text: 'Definition', link: 'definition' }
            ]
        },
        {
            text: 'Changelog',
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
            text: 'Resources',
            items: [
                { text: 'Firmware library', link: 'dfu-package' },
                { text: 'Firmware changelog', link: 'dfu-changelog' }
            ]
        }
    ]
}
