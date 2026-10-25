---
title: "2b · Skills & Memory：不从头开始"
description: "5 分钟掌握 Skills 与 Memory：三类落点、三种粒度、SKILL.md 的渐进披露、SkillsBench 的收益与反例，以及技能的归纳与维护。"
pageClass: essence-page
outline: [2, 3]
---

# 2b · Skills & Memory：不从头开始

<div class="essence-deck">
<p class="essence-deck__thesis">不改变模型权重，也能让 agent 从经验中学习；代价是把学习问题换成数据管理问题。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>4 个概念</span><span>对应详细讲义 <a href="../notes/lecture-04-memory-and-skills">全文</a></span></p>
</div>

## 先记住

- **经验有三个落点**：上下文窗口、外部工件、模型权重。外部工件可检查、可编辑、可跨模型移植，但必须自己完成归纳、筛选与维护。
- **经验有三种粒度**：完整 episode、单条 fact、可复用的 skill。保真度越高越贵、越难迁移；抽象越多越省、越依赖归纳质量。
- **Skill 有两个来源**：人写的 instructions（意图清楚、可信，但耗人力）与 agent 自己归纳的 skills（能发现人说不出的东西，但要判分与策展）。
- **技能不是越多越好**：SkillsBench 在 87 个真实任务上把平均通过率从 33.9% 提到 50.5%，但在 13/87 个任务上反而变差。

## 核心机制

Agent Skills 把技能做成一个文件包：必须有 `SKILL.md`（YAML 元数据 + Markdown 正文），可选 `scripts/`、`references/`、`assets/`。它靠**渐进披露**分三层加载，资源层再按需拆成脚本与文档：

<div class="flow">
  <div class="flow__step"><strong>Index</strong><small>name + description 常驻 system prompt</small></div>
  <div class="flow__step"><strong>Body</strong><small>命中后才加载 SKILL.md 正文</small></div>
  <div class="flow__step"><strong>Scripts</strong><small>执行脚本，只把结果给模型看</small></div>
  <div class="flow__step"><strong>References</strong><small>真正需要时才读长文档</small></div>
</div>

`description` 实际上就是检索键：写得含糊，技能不会在正确时机触发；写得过宽，又会把不相干的技能拉进来。是否触发由模型决定，只能靠评测调。

归纳技能的核心循环是 **judge → induce → admit**：先判断这次轨迹是否成功，再从成功或失败中提炼策略，最后决定是否写入记忆。文本与代码是两种表示：文本适应性高、可就地修改，但难测试、组合性弱；代码可单测、可组合、省步数，但页面结构一变就脆。

Memory 侧的三块地基是：MemGPT 用工具调用在 working context 与外部存储之间搬数据；Mem0 把写入拆成 ADD / UPDATE / DELETE / NOOP，解决“事实会变”；Reflexion 用自然语言反思让 agent 在同一任务上越试越好。

## 最容易错的地方

- **把 memory 与 skill 当同义词。** memory 保存“从交互中得到的东西”，skill 保存“如何行动的可复用知识”；交集是 induced skill。
- **认为加技能一定提升。** 技能会占用注意力并带倾向性，可能把模型推离它更擅长的策略；必须 A/B 评测。
- **从零凭空写技能，或写得又长又全。** 更可靠的做法是让 agent 刚跑完流程就基于轨迹草拟，再验证；一个技能只解决一类事，短而聚焦通常收益更大。

## 30 秒自测

**1. 为什么外部工件比权重更适合承载“可协商”的知识？**

<details>
<summary>答案</summary>

外部工件是文本或代码，人能读、能 diff、能直接改，也能跨模型与 harness 移植；权重更新慢、不可解释，而且绑定到具体模型。

</details>

**2. SkillsBench 的 13/87 个反例说明什么？**

<details>
<summary>答案</summary>

技能不是无风险的正收益。任务所需技能越少、SKILL.md 越短，平均收益越大；技能过多会稀释注意力，用错地方反而伤害表现。

</details>
