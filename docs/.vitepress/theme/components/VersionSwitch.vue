<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

type Section = 'notes' | 'essence'

const { page } = useData()

const context = computed(() => {
  const rel = page.value.relativePath.replace(/\.md$/, '')
  const match = rel.match(/^(notes|essence)(?:\/(.*))?$/)
  if (!match) return null

  const section = match[1] as Section
  const rawSlug = match[2] || ''
  const slug = rawSlug === 'index' ? '' : rawSlug

  // 只有讲义页与两边的总览页参与切换，避免误伤未来的其他页面
  if (slug && !slug.startsWith('lecture-')) return null

  return {
    section,
    slug,
    notesHref: withBase(`/notes/${slug}`),
    essenceHref: withBase(`/essence/${slug}`),
    isLecture: Boolean(slug)
  }
})
</script>

<template>
  <nav v-if="context" class="version-switch" aria-label="切换讲义版本">
    <span class="version-switch__label">版本</span>
    <a
      class="version-switch__tab"
      :class="{ 'is-active': context.section === 'notes' }"
      :href="context.notesHref"
      :aria-current="context.section === 'notes' ? 'page' : undefined"
    >
      详细讲义
    </a>
    <a
      class="version-switch__tab"
      :class="{ 'is-active': context.section === 'essence' }"
      :href="context.essenceHref"
      :aria-current="context.section === 'essence' ? 'page' : undefined"
    >
      精华版
    </a>
    <span class="version-switch__hint">
      {{ context.section === 'notes' ? '想先抓重点？读 5 分钟速读卡' : '需要完整推导？回到详细讲义' }}
    </span>
  </nav>
</template>
