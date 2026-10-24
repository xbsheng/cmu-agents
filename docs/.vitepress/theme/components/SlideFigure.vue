<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  page: string | number
  caption?: string
  alt?: string
}>()

const src = computed(() => {
  const n = String(props.page).padStart(2, '0')
  return `/images/lecture-06/p${n}.png`
})
const altText = computed(() => props.alt || props.caption || `Slide ${props.page}`)
</script>

<template>
  <figure>
    <a :href="src" target="_blank" rel="noreferrer">
      <img :src="src" :alt="altText" loading="lazy" />
    </a>
    <figcaption v-if="caption">
      <span v-html="caption"></span>
    </figcaption>
  </figure>
</template>
