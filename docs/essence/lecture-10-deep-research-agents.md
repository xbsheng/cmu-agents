---
title: "5b · Deep Research Agent"
description: "5 分钟掌握 Deep Research：经典 QA 的四个缺口、BrowseComp 与冻结语料、rubric 评测、FACT 引用核查，以及三段式训练配方。"
pageClass: essence-page
outline: [2, 3]
---

# 5b · Deep Research Agent

<div class="essence-deck">
<p class="essence-deck__thesis">Deep research 的本质是“信息需求超出单次检索能力”；评测对象从答案字符串变成答案加证据链。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-10-deep-research-agents">全文</a></span></p>
</div>

## 先记住

- **经典 QA 基准在四个维度失效**：检索复杂度、领域专长、答案形态、证据支撑。近三年的基准基本是在逐条补缺口。
- **把问题造难是有代价的**：BrowseComp 从答案反推线索，题目接近谜题；BrowseComp-Plus 干脆冻结语料，把开放网络换成 830 题 / 100,195 篇文档的封闭世界。
- **长文答案不能用相似度评**：ROUGE、BERTScore、BLEURT 选出“专家更喜欢的答案”的准确率只有 57%–62%，而随机是 50%。
- **训练配方是 mid-training → SFT → RL**：数据来自知识图谱采样出的合成问题与强教师轨迹；RL 的吞吐往往比算法更早成为瓶颈。

## 核心机制

开放式报告没有唯一答案，所以评测从“和参考答案比”改成“对照检查表”。专家写一组带权重的 rubric 条目，判分模型逐条判断是否满足，再加权汇总：

$$
S_c = \frac{\sum_i w_i b_i}{\sum_i w_i}
$$

这个设计真正奖励的是**限定**：把“在某些研究中被偏好”夸大成“所有领域都成立”，第一条仍得分、第二条被扣分，总分被压低——这正是人类专家在意、相似度指标看不见的东西。

引用支撑则是另一层：FACT 抽取“论断 + 引用 URL”，抓取页面，判断页面是否支持论断。引用准确率惩罚乱引，有效引用数惩罚“只引一条却写满全篇”。两者要并列报告。

<div class="flow">
  <div class="flow__step"><strong>Plan</strong><small>把信息需求拆成检索子问题</small></div>
  <div class="flow__step"><strong>Search</strong><small>多轮检索，后一轮依赖前一轮</small></div>
  <div class="flow__step"><strong>Read</strong><small>抽取证据与冲突</small></div>
  <div class="flow__step"><strong>Synthesize</strong><small>写成带引用的长报告</small></div>
  <div class="flow__step"><strong>Judge</strong><small>rubric + 引用核查</small></div>
</div>

训练上，短答案可以用 exact match 奖励，开放式报告不行。DR Tulu 用“随策略一起演化的 rubric”给报告打分：策略采样多条报告，让模型对比生成新的正/负条目，条目进入缓冲区用于打分。消融显示：随机奖励没有提升，初始 rubric 有明显提升，演化 rubric 提升更大。

## 最容易错的地方

- **用 exact match 评长报告。** 覆盖度、取舍、限定条件都无法用字符串匹配衡量。
- **把 rubric 当客观真值。** 生成式 rubric 里约 15% 的条目空洞、错误或含糊；任何 rubric 基准都应先报告一次 rubric 审计。
- **忽略检索器。** 传统检索器只看最新 query，丢掉 agent 的意图；把当前推理一起送进去并针对性训练，可以在更少检索次数下拿到更高准确率。

## 30 秒自测

**1. 为什么相似度指标在 deep research 上接近抛硬币？**

<details>
<summary>答案</summary>

它们测的是表层词汇重合，不是结论正确性。措辞不同但结论正确的答案会被低分，词汇高度重叠但结论相反的答案会被高分。

</details>

**2. 引用准确率高就说明报告好吗？**

<details>
<summary>答案</summary>

不一定。它只说明“引用的页面支持论断”，不检查页面是否权威、是否遗漏了该引的内容，也不衡量综合、取舍与洞察；可以写一篇引用全对但毫无价值的报告。

</details>
