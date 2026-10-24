<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { isDark, page } = useData()
const container = ref<HTMLElement>()

const theme = () => (isDark.value ? 'dark' : 'light')

function mount() {
  if (!container.value) return
  container.value.replaceChildren()
  const s = document.createElement('script')
  s.src = 'https://giscus.app/client.js'
  s.async = true
  s.crossOrigin = 'anonymous'
  const attrs: Record<string, string> = {
    'data-repo': 'xbsheng/cmu-agents',
    'data-repo-id': 'R_kgDOUYmpvA',
    'data-category': 'Announcements',
    'data-category-id': 'DIC_kwDOUYmpvM4DJgwl',
    'data-mapping': 'pathname',
    'data-strict': '0',
    'data-reactions-enabled': '1',
    'data-input-position': 'top',
    'data-theme': theme(),
    'data-lang': 'zh-CN',
    'data-loading': 'lazy'
  }
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v)
  container.value.appendChild(s)
}

onMounted(mount)
watch(() => page.value.relativePath, mount)

// 主题切换时同步 iframe 配色
watch(isDark, () => {
  document
    .querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    ?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: theme() } } },
      'https://giscus.app'
    )
})
</script>

<template>
  <div ref="container" class="giscus-container" />
</template>

<style scoped>
.giscus-container {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
