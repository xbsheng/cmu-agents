---
title: "3a · Planning 与多 Agent"
description: "5 分钟掌握 Planning：计划的定义、四种收益、承诺时机、误差累积与重规划预算，以及多 agent 何时真的划算。"
pageClass: essence-page
outline: [2, 3]
---

# 3a · Planning 与多 Agent

<div class="essence-deck">
<p class="essence-deck__thesis">计划是对未来行为的显式表示，是提案而不是保证；它买的是结构，不是正确性。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-05-planning">全文</a></span></p>
</div>

## 先记住

- **计划不是“更长的 CoT”。** 它要显式写出要尝试的动作或子目标、顺序与依赖，能被读、被改、被环境打断；CoT 不改变世界状态。
- **收益与代价来自同一组结构。** 收益是模块化、可检查、限制上下文、控制；代价是抽象丢细节、角色固定、重规划不可预测、规划本身可能过度思考。
- **承诺的时机是一条光谱。** 开发者写死的 workflow → 模型先规划再执行 → 执行中自适应重规划；越往右越灵活，也越难审计。
- **长程的主要敌人是误差累积。** 单步 90% 在 30 步后只剩约 4%，而且过去的错误会让后续步骤更容易出错。

## 核心机制

是否值得引入计划结构，先看失败是“单步做错”还是“结构没被表达出来”。有并行、有依赖、有迟到信息、有不可逆动作时，计划才值得：

| 档位 | 谁决定步骤 | 优点 | 风险 |
|---|---|---|---|
| Workflow | 开发者写死 | 快、便宜、可预测、每步可换模型 | 环境变了不会自己长分支 |
| Plan-then-execute | 模型一次规划后冻结 | 灵活一档，计划可审阅 | 计划错了会一路错到底 |
| Adaptive agent | 执行中按反馈重规划 | 能吸收新信息、能改图 | 行为难预测、成本高 |

MACU 把多 agent 协调做成一张可改的 DAG：Manager 生成子任务图，子 agent 在独立 VM 里并行执行，follow-up loop 决定继续还是重规划。它在 Odysseys 上把成功率从 8.5% 提到 34.0%；固定一个 4B worker、只换更强的 Manager，OSWorld 从 25.0% 升到 58.3%。

更值得注意的是“重规划值多少钱”：不允许改图 25.0%，改 1 次 27.8%，改 5 次 47.2%，改 10 次 58.3%。收益不是线性的：第一次往往只补局部，5 次左右才够完成“方向错了，换一条路”的结构性调整，再往上边际递减。

<div class="flow">
  <div class="flow__step"><strong>Decompose</strong><small>把任务写成子目标与依赖</small></div>
  <div class="flow__step"><strong>Commit</strong><small>在某个时刻把计划固定下来</small></div>
  <div class="flow__step"><strong>Execute</strong><small>子 agent / 工具并行或串行执行</small></div>
  <div class="flow__step"><strong>Observe</strong><small>检查结果与环境变化</small></div>
  <div class="flow__step"><strong>Replan</strong><small>接受、重做，或改图</small></div>
</div>

## 最容易错的地方

- **把 CoT 当 agent 计划。** CoT 不能执行、不能被检查、不能被环境打断；它不处理“动作会失败、会揭示信息、会不可逆”。
- **认为计划越细越好。** 计划越具体，越依赖当前任务的假设；任务边界一变，计划反而是负债。
- **认为多 agent 一定更强。** 收益依赖任务可分离、可以真并行、验证器能检查部分完成；强序列依赖的任务拆开只会增加协调成本。

## 30 秒自测

**1. 什么信号说明“该加计划结构”了？**

<details>
<summary>答案</summary>

当失败不是单步做错，而是结构没被表达出来：任务有并行、有依赖、有迟到信息、有不可逆动作，或者需要跨步骤保留约束与进度。

</details>

**2. 为什么重规划的收益不是线性的？**

<details>
<summary>答案</summary>

前几次修改往往只是局部修补；要到若干次之后，才够完成“发现方向错了、换一条路”的结构性调整。再往上，受任务长度与验证能力限制，边际收益递减。

</details>
