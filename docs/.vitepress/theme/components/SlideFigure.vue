<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{
  lecture: string | number
  page: string | number
  caption?: string
  alt?: string
}>()

const src = computed(() => {
  const lec = String(props.lecture).padStart(2, '0')
  const n = String(props.page).padStart(2, '0')
  return withBase(`/images/lecture-${lec}/p${n}.png`)
})
const altText = computed(() => props.alt || props.caption || `Slide ${props.page}`)
</script>

<template>
  <figure>
    <a :href="src" target="_blank" rel="noreferrer">
      <img :src="src" :alt="altText" loading="lazy" decoding="async" />
    </a>
    <figcaption v-if="caption">
      <span v-html="caption"></span>
    </figcaption>
  </figure>
</template>
