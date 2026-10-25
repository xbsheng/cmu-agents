<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <div class="not-found-page">
    <p class="not-found-page__code">404</p>
    <h1>页面不存在</h1>
    <p class="not-found-page__lead">
      这个地址没有对应的讲义。可能是链接过期、拼写错误，或者页面已经被移动。
    </p>
    <div class="not-found-page__links">
      <a class="not-found-page__link not-found-page__link--primary" :href="withBase('/essence/')">
        从精华版总览开始
      </a>
      <a class="not-found-page__link" :href="withBase('/notes/')">浏览详细讲义</a>
      <a class="not-found-page__link" :href="withBase('/')">回到首页</a>
    </div>
  </div>
</template>
