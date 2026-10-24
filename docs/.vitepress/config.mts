import { defineConfig } from 'vitepress'

const siteUrl = process.env.DOCS_URL || 'https://xbsheng.github.io/cmu-agents/'
const base = process.env.DOCS_BASE || '/cmu-agents/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'CMU AI Agents 讲义',
  description: '卡内基梅隆大学 11-768 AI Agents 课程中文详细讲义',
  // Project site on GitHub Pages: https://xbsheng.github.io/cmu-agents/
  // Override with DOCS_BASE=/ when deploying to a custom domain.
  base,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: siteUrl
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '64x64', href: `${base}favicon.png` }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}apple-touch-icon.png` }],
    ['meta', { name: 'theme-color', content: '#8b0000' }],
    ['meta', { name: 'theme-color', content: '#121212', media: '(prefers-color-scheme: dark)' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'CMU 11-768 · AI Agents' }],
    ['meta', { property: 'og:title', content: 'CMU 11-768 · AI Agents 中文讲义' }],
    ['meta', { property: 'og:description', content: '卡内基梅隆大学 11-768 AI Agents 课程中文详细讲义，共 15 讲。' }],
    ['meta', { property: 'og:image', content: `${siteUrl}logo.png` }]
  ],
  themeConfig: {
    logo: { src: '/logo-nav.png', alt: 'CMU 11-768 AI Agents' },
    nav: [
      { text: '课程笔记', link: '/notes/' },
      { text: '课程主页', link: 'https://www.cmu-agents.com' }
    ],
    sidebar: {
      '/notes/': [
        {
          text: '导论与 Agent 能力',
          items: [
            { text: '1a · 课程概览', link: '/notes/lecture-01-agents' },
            { text: '1b · Tool Use', link: '/notes/lecture-02-tool-use' },
            { text: '2a · 长上下文 Agent', link: '/notes/lecture-03-long-context' },
            { text: '2b · Skills & Memory', link: '/notes/lecture-04-memory-and-skills' },
            { text: '3a · Planning与多 Agent', link: '/notes/lecture-05-planning' }
          ]
        },
        {
          text: '应用领域',
          items: [
            { text: '3b · Coding Agent', link: '/notes/lecture-06-coding-agents' },
            { text: '4a · Computer Use Agent', link: '/notes/lecture-07-computer-use-agents' },
            { text: '5b · Deep Research Agent', link: '/notes/lecture-10-deep-research-agents' }
          ]
        },
        {
          text: '训练方法',
          items: [
            { text: '4b · SFT', link: '/notes/lecture-08-sft' },
            { text: '5a · RL 基础', link: '/notes/lecture-09-rl-basics' },
            { text: '6a · RL 高级', link: '/notes/lecture-11-rl-advanced' },
            { text: '6b · RL 系统', link: '/notes/lecture-12-rl-systems' }
          ]
        },
        {
          text: '安全与框架',
          items: [
            { text: '7a · Agent 安全', link: '/notes/lecture-13-agent-safety' },
            { text: '7b · OpenHands', link: '/notes/lecture-14-openhands' },
            { text: '9a · 编排与监控', link: '/notes/lecture-15-orchestration-and-monitoring' }
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
