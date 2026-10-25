<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { courseModules } from '../../course'

const props = defineProps<{ module: string }>()
const module = computed(() => courseModules.find((item) => item.id === props.module))
const totalMinutes = computed(
  () => module.value?.lectures.reduce((sum, lecture) => sum + lecture.minutes, 0) ?? 0
)
</script>

<template>
  <div v-if="module" class="module">
    <div class="module__head">
      <h3>{{ module.title }}</h3>
      <span>{{ module.lectures.length }} 讲 · 约 {{ totalMinutes }} 分钟</span>
    </div>
    <a
      v-for="lecture in module.lectures"
      :key="lecture.slug"
      class="lecture-row"
      :href="withBase(`/essence/${lecture.slug}`)"
    >
      <span class="lecture-row__no">{{ lecture.code }}</span>
      <span class="lecture-row__body">
        <strong>{{ lecture.title }}</strong>
        <span>{{ lecture.oneLiner }}</span>
      </span>
      <span class="lecture-row__meta">{{ lecture.minutes }} 分钟</span>
    </a>
  </div>
</template>
