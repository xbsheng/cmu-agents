---
title: "2a · 长上下文：容量与成本"
description: "5 分钟掌握长上下文：为什么累计输入二次增长、容量与效率两条战线、混合架构、缓存价格与压缩的状态估计。"
pageClass: essence-page
outline: [2, 3]
---

# 2a · 长上下文：容量与成本

<div class="essence-deck">
<p class="essence-deck__thesis">长上下文有两场独立的战争：容量问“用不用得上”，效率问“付不付得起”。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>4 个概念</span><span>对应详细讲义 <a href="../notes/lecture-03-long-context">全文</a></span></p>
</div>

## 先记住

- **成本由循环决定，不由单次调用决定。** 每轮把历史整体重新送进模型：每轮新增 5K，五轮后上下文只有 26K，累计处理量却是 80K，而且随轮数呈二次增长。
- **容量与效率要分开测。** 模型可以“装得下但用不好”，也可以“用得好但服务不起”；1M 窗口是宣称，能在 1M 里找到证据才是能力。
- **前沿模型的共识是混合架构。** 大多数层做廉价的地方性计算（滑窗、线性注意力、状态空间），少数层做昂贵的全局计算，比例约 3:1 到 5:1。
- **压缩是最后手段，也是一次状态估计。** 目标不是“摘要得好看”，而是让压缩后的未来动作分布接近原始历史。

## 核心机制

缓存解决“重复”，压缩解决“装不下”，两者不能互相替代：

| 手段 | 解决什么 | 不解决什么 |
|---|---|---|
| Prompt caching | 复用稳定前缀，减少重复 prefill | 不减少模型实际能看见的历史 |
| 上下文压缩 | 把历史压进预算，降低干扰 | 不保证行为不变，可能逐轮漂移 |
| 长窗口架构 | 提高原理上可达的历史长度 | 不保证远处证据真的被用上 |

缓存的价格差非常直接：多数厂商 cached input 约为 regular input 的 1/10，output 约为 regular input 的 3–6 倍。一次系统提示里加时间戳，就能让整条前缀缓存失效；所以 prompt 应该设计成“稳定前缀 + 只追加的日志”。

压缩则要满足三个互相拉扯的条件：

$$
\hat s_t = \mathcal{C}(H_t;\, B), \qquad |\hat s_t| \le B, \qquad p(A_{\text{future}} \mid \hat s_t) \approx p(A_{\text{future}} \mid H_t)
$$

保留什么也有优先级：目标与硬约束逐字保留（锚点），近期动作与结果精确保留（尾部），已做的决策压成检查点，大日志外置成证据指针，重复与被取代的尝试直接丢弃。

<div class="flow">
  <div class="flow__step"><strong>Growth</strong><small>历史线性增长，累计计算二次增长</small></div>
  <div class="flow__step"><strong>Inference</strong><small>prefill 影响 TTFT，decode 影响 TPOT</small></div>
  <div class="flow__step"><strong>Architecture</strong><small>局部层 + 少数全局层</small></div>
  <div class="flow__step"><strong>Caching</strong><small>稳定前缀，命中率做到 90%+</small></div>
  <div class="flow__step"><strong>Compaction</strong><small>保留锚点、尾部与恢复路径</small></div>
</div>

## 最容易错的地方

- **以为 1M 窗口就不需要压缩。** 容量不等于可用性，而且每一步都要为长 prefill 付费，除非缓存命中。
- **以为压缩能省钱。** 压缩省的是可见历史；缓存省的才是重复计算。如果前缀稳定，压缩的主要收益是减少干扰。
- **反复压缩不留锚点。** 第二次压缩的输入是上一次的摘要，误差会逐轮累积：“CUDA 12.4” → “12.x” → “recent CUDA” → 消失。

## 30 秒自测

**1. 为什么 agent 的累计输入是二次增长？**

<details>
<summary>答案</summary>

每一轮都要把“固定前缀 + 此前全部历史”重新送进模型，单轮输入随轮数线性增长；把每轮输入累加，总量就随轮数二次增长。

</details>

**2. 压缩的目标应该怎么定义？**

<details>
<summary>答案</summary>

不是还原历史，而是保持行为：压缩后的状态应让后续动作分布接近原始历史下的分布，同时大小有界、原文可找回。评测也应该用“续跑”而不是“摘要质量”。

</details>
