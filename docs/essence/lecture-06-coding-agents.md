---
title: "3b · Coding Agent"
description: "5 分钟掌握 Coding Agent：单步模型与仓库级修改、FIM、SWE-bench 的 fail-to-pass/pass-to-pass、localize-edit-verify 与训练闭环。"
pageClass: essence-page
outline: [2, 3]
---

# 3b · Coding Agent

<div class="essence-deck">
<p class="essence-deck__thesis">Coding agent 不是单一模型，而是“模型 + 工具 + 循环”；核心循环是 localize → edit → verify。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-06-coding-agents">全文</a></span></p>
</div>

## 先记住

- **三个层次**：写一段代码（单步补全）、改一个仓库（agentic coding）、参与完整软件生命周期（需求、评审、部署、维护）。
- **单步模型仍是地基**：预训练处理代码配比、清洗、分词与长上下文；中训练把通用模型调成代码模型；FIM（infilling）让模型学会利用右侧上下文。
- **代码评测比文本更依赖执行**：参考解匹配、BLEU/CodeBLEU/CodeBERTScore 各有盲区，执行测试是主流，但测试质量是当前最大瓶颈之一。
- **工具设计会显著影响成绩**：只给 bash 也能工作，但专用 edit tool、合理的 diff 格式、代码搜索会明显降低出错率。

## 核心机制

仓库级任务不是“生成一个函数”，而是把失败转成对行为的假设，再逐步排除：

<div class="flow">
  <div class="flow__step"><strong>Localize</strong><small>rg / 依赖图 / 测试栈追踪找位置</small></div>
  <div class="flow__step"><strong>Edit</strong><small>用 diff 或编辑器精确修改</small></div>
  <div class="flow__step"><strong>Verify</strong><small>跑相关测试与回归</small></div>
  <div class="flow__step"><strong>Revise</strong><small>失败 → 修正假设，不重复同一动作</small></div>
</div>

SWE-bench 是这条循环的“黄金标准”：给 issue、修复前的仓库快照与相关测试，agent 产出 patch，应用后跑测试。两类测试缺一不可：**fail-to-pass** 验证问题真的被修了，**pass-to-pass** 验证没有把别的东西改坏。

训练正在形成闭环：SWE-bench 提供评测，SWE-Gym / SWE-smith 提供可执行训练环境。SWE-smith 用“注入 bug + 变异测试”批量造任务；multi-harness training 让同一模型适配不同 agent 框架。一个原本约 11% 成功率的模型，仅用 500 个训练环境就能明显提升。

## 最容易错的地方

- **把 pass@k 当产品可用性。** pass@k 允许采样多次再挑一个，真实产品往往只有一次机会；还要看成本、延迟、回归与可维护性。
- **把测试当绝对真值。** 测试可能漏覆盖、写死实现细节，甚至被 agent 改掉；验证器本身需要审计。
- **以为“换个更大的模型”就能解决仓库级任务。** 缺的是搜索、编辑、执行、验证这一整套循环；模型只是其中一环。

## 30 秒自测

**1. 为什么 SWE-bench 比 HumanEval 难？**

<details>
<summary>答案</summary>

HumanEval 是自包含的函数补全；SWE-bench 要在真实仓库里定位相关代码、跨文件修改、处理依赖与回归，并由仓库测试判定，考的是搜索、编辑、验证的完整循环。

</details>

**2. 为什么 edit tool 的格式会影响成绩？**

<details>
<summary>答案</summary>

模型需要精确表达“改哪里、改成什么”。diff 或结构化编辑能减少歧义与误改；纯文本重写则容易丢上下文、引入无关变更，验证阶段才发现代价很高。

</details>
