<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { courseModules } from '../../course'

const props = defineProps<{ module: string }>()
const module = computed(() => courseModules.find((item) => item.id === props.module))
</script>

<template>
  <div v-if="module" class="course-table">
    <table tabindex="0">
      <caption class="visually-hidden">{{ module.title }}</caption>
      <thead>
        <tr>
          <th scope="col">讲次</th>
          <th scope="col">主题</th>
          <th scope="col">录像</th>
          <th scope="col">笔记</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lecture in module.lectures" :key="lecture.slug">
          <td>{{ lecture.code }}</td>
          <td>{{ lecture.topic }}</td>
          <td>{{ lecture.video ? '有' : '无' }}</td>
          <td>
            <a
              :href="withBase(`/notes/${lecture.slug}`)"
              :aria-label="`详细讲义：${lecture.code} ${lecture.topic}`"
            >详细</a><br />
            <a
              :href="withBase(`/essence/${lecture.slug}`)"
              :aria-label="`精华版：${lecture.code} ${lecture.topic}`"
            >速读</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
