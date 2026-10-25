---
title: "9a · 编排与监控：把行为写进图"
description: "5 分钟掌握显式工作流：state/node/edge、检查点与恢复、trace 树、三层测试、规模化监控与资源包络。"
pageClass: essence-page
outline: [2, 3]
---

# 9a · 编排与监控：把行为写进图

<div class="essence-deck">
<p class="essence-deck__thesis">工作流把“每一步做什么”从模型手里收回到代码里；trace 与监控让“应该发生什么”变成“实际发生了什么”。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-15-orchestration-and-monitoring">全文</a></span></p>
</div>

## 先记住

- **工作流不是“更弱的 agent”，而是把一部分决策替换成结构。** 换来一致性、效率、可测试性与更小的方差，代价是适应性。
- **三件套是 state、node、edge**：节点读共享状态、只返回自己改动的字段；条件边或 `Command(goto=...)` 依据中间结果决定下一跳。
- **可恢复性取决于节点粒度**：检索与生成拆成两个节点，生成阶段崩溃时不必重跑检索；粒度越细，崩溃损失越小，但检查点写入越频繁、状态序列化越贵。
- **trace 是调试与评测的共同底座**：一次执行是一棵 run 树，每个 run 记录输入、输出、耗时、错误与 token。它回答“哪一步慢、哪一步错”，不回答“为什么错”。

## 核心机制

一个客服工作流把“人”画成节点，而不是流程外的一封邮件；人的响应也进入状态，可以被检查点保存、超时重试、在 trace 里看到：

<div class="flow">
  <div class="flow__step"><strong>Read</strong><small>读取邮件，写入状态</small></div>
  <div class="flow__step"><strong>Classify</strong><small>LLM 分类，决定路由</small></div>
  <div class="flow__step"><strong>Retrieve</strong><small>代码 + 检索服务</small></div>
  <div class="flow__step"><strong>Draft</strong><small>LLM 起草回复</small></div>
  <div class="flow__step"><strong>Review</strong><small>计费类请求必须人工批准</small></div>
  <div class="flow__step"><strong>Send</strong><small>代码执行，写审计</small></div>
</div>

这里最典型的风险结构是：**分类是一次模型判断，而控制流继承了这次判断的错误**。把退款请求误判成 question，回复就会绕过人工批准直接发出。缓解不能只靠“把分类 prompt 写好一点”，而要在代码层加硬检查：金额超过阈值、检测到 refund/charge、草稿缺字段，都必须复核。

测试要分三层：**节点单测**（固定模型输出，断言状态更新与路由目标）、**受控工作流测试**（批准、拒绝、瞬时失败等分支）、**换模型后的回归**。直接调节点会绕过 checkpointer，所以单测通过不代表图能跑通。

## 最容易错的地方

- **工作流更好测，所以更安全。** 测试覆盖的是你写下的分支，模型可能在分支内部做出没预料的事，比如草稿里主动承诺退款；断言“消息已发送”不等于“消息发得对”。
- **以为 trace 能解释原因。** 它记录发生了什么，不记录为什么；模型的内部推理通常不在 run 的输入输出里。
- **把排名反转当成“评测错了”。** 分数是资源包络的函数：Terminal-Bench 上 40% 与 27% 的差距，与 32%、50% 的超时率同量级；在双方都不超时的 28 个任务上，排名反转成 0.500 与 0.429。报告分数必须同时报告预算、超时策略与重试次数。

## 30 秒自测

**1. 什么时候该用显式工作流，而不是单 agent？**

<details>
<summary>答案</summary>

当步骤能从政策、手册或 SOP 里写出来，且错误代价高（退款、发信、改数据）时。步骤取决于中间发现（调试、研究、探索）时，写死的图会不断需要新分支。

</details>

**2. 为什么 trace 必须是树，而不是一串日志？**

<details>
<summary>答案</summary>

日志是时间序列，trace 是调用关系。只有父子关系才能把耗时与错误归因到具体一层：慢在模型、工具、重试还是排队；日志只能看到“发生了”，看不到“谁包含谁”。

</details>
