import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'LINK+',
  description: 'LINK+ Documentation',
  srcDir: 'src',
  cleanUrls: true, // require rewrite on Apache or NGINX
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: '/logo.svg',

    outline: {
      label: '本页内容',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    sidebarMenuLabel: '菜单',

    nav: [
      { text: '主页', link: '/' },
      { text: '向导', link: '/guide/keycode-edit' },
      { text: '下载', link: 'https://gitee.com/lne-lab/link-plus/releases/tag/3.1.7' },
      {
        text: '3.1.7',
        items: [
          {
            text: '更新日志',
            link: 'https://github.com/lnelab/link-plus/blob/main/CHANGELOG.md'
          }
        ]
      }
    ],

    sidebar: {
      '/guide/': sidebarGuide()
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lnelab/link-plus' }
    ],

    footer: {
      message: '<a href="https://beian.miit.gov.cn">苏ICP备2021037810号-1</a>',
      copyright: `Copyright © ${new Date().getFullYear()} LNE LAB`
    }
  }
})


function sidebarGuide() {
  return [
    {
      text: '介绍',
      items: [
        { text: 'LINK+ 是什么', link: '/guide/what-is-link-plus' },
        { text: '快速上手', link: '/guide/quick-start' },
        { text: '关于我们', link: '/guide/about-us' },
      ]
    },
    {
      text: '向导',
      items: [
        { text: '按键编辑', link: '/guide/keycode-edit' },
        { text: '布局', link: '/guide/layouts' },
        { text: '设备信息', link: '/guide/device' },
        { text: '键盘测试', link: '/guide/tester' },
        { text: '展览厅', link: '/guide/gallery' }
      ]
    },
    {
      text: '进阶',
      items: [
        { text: '设备识别', link: '/guide/device-identify' },
        { text: '定义', link: '/guide/definition' },
        { text: '固件升级', link: '/guide/dfu' }
      ]
    }
  ]
}