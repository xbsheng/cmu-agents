import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'CMU 11-768 · AI Agents',
  description: '卡内基梅隆大学 11-768 AI Agents 课程中文讲义笔记',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#b31b1b' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }]
  ],
  themeConfig: {
    nav: [
      { text: '课程笔记', link: '/notes/' },
      { text: '课程主页', link: 'https://www.cmu-agents.com' }
    ],
    sidebar: {
      '/notes/': [
        {
          text: 'Domains · 应用领域',
          items: [
            { text: '3b · Coding Agents', link: '/notes/lecture-06-coding-agents' }
          ]
        }
      ]
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdatedText: '最后更新',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    footer: {
      message: '基于 CMU 11-768 课程公开材料整理，仅供学习使用。',
      copyright: 'Course materials © Carnegie Mellon University'
    }
  },
  markdown: {
    lineNumbers: true,
    math: true
  }
})
