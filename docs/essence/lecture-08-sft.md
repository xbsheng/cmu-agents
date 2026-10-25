---
title: "4b · SFT：把轨迹写进权重"
description: "5 分钟掌握 SFT：render→tokenize→mask、只训练 assistant、数据选择、teacher forcing 的盲区，以及 SFT 与 RL 的分工。"
pageClass: essence-page
outline: [2, 3]
---

# 4b · SFT：把轨迹写进权重

<div class="essence-deck">
<p class="essence-deck__thesis">SFT 的本质是“把录制的轨迹编译进权重”；工程细节（模板、掩码、数据）比算法更容易决定成败。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-08-sft">全文</a></span></p>
</div>

## 先记住

- **一条轨迹先变成一条 token 序列**：chat template 把 system / user / assistant / observation 渲染成扁平文本，角色信息在渲染后就不存在了。
- **默认只训练 assistant 段**：observation 是条件上下文，不是预测目标。让模型拟合工具输出，可能教会它编造工具结果。
- **掩码有三个高发错误点**：角色头（推理时由模板提供，不该学）、回合结束符（必须学，否则不会停）、推理块（是否参与损失是一个独立开关）。
- **数据选择比超参数更值钱**：轨迹来源、教师选择、任务源组合、按新任务还是同任务扩量，差异都比调学习率大。

## 核心机制

损失只落在掩码为 1 的位置：

$$
\mathcal{L}(\theta) = -\sum_{t:\,m_t=1} \log p_\theta(x_t \mid x_{<t})
$$

掩码的构造顺序不能反：**Render**（模板记录 assistant span 的字符位置）→ **Tokenize**（字符位置映射到 token 位置，注意 token 可能跨字符边界）→ **Mask**（assistant span 内置 1，其余置 0）。

<div class="flow">
  <div class="flow__step"><strong>Render</strong><small>模板渲染，记录 assistant span</small></div>
  <div class="flow__step"><strong>Tokenize</strong><small>字符位置映射到 token</small></div>
  <div class="flow__step"><strong>Mask</strong><small>只让 assistant token 参与损失</small></div>
  <div class="flow__step"><strong>Train</strong><small>交叉熵 + packing</small></div>
</div>

SFT 与 RL 的分工可以用一句话记住：**监督信号来自记录，还是来自自己跑出来的结果**。SFT 是稠密监督，每个 assistant token 都有目标；RL 是稀疏监督，一条轨迹一个标量。SFT 擅长工具调用、格式与长任务，RL 擅长把“已经会尝试”的能力磨尖。

OpenThoughts-Agent 的对照很能说明问题：ColdSFT + RL 平均 21.7，SFT only 15.9，ColdSFT only 15.1；不做 SFT 直接 RL 只有 3.6，基座是 2.7。更反直觉的是，最好的配方不是“把 SFT 训到最高分再交给 RL”，而是选一个“格式已经正确、但还有改进空间”的 checkpoint。

## 最容易错的地方

- **训练 loss 低就以为 agent 能工作。** 教师强制只在录制过的前缀上评分；部署时模型一旦走偏，就进入训练从未访问过的状态。
- **“通过测试”就当作值得模仿。** 成功轨迹里可能包含只读不改、编辑—测试死循环、补丁里留 `print` 等坏习惯，损失会照单全收。
- **随便换模板。** 训练模板与推理模板哪怕只差空白，前缀分布就变了；模型学到的条件反射会失效。

## 30 秒自测

**1. 为什么默认不训练 observation token？**

<details>
<summary>答案</summary>

观测是环境给的，不是模型该预测的。训练它可能让模型学会编造工具结果，在真实部署里不调用工具、直接写出看似合理的输出。

</details>

**2. 为什么 SFT checkpoint 不该选自己的最高分？**

<details>
<summary>答案</summary>

SFT 训得越久，策略越尖锐、越贴近示范分布，探索余地越小；RL 需要一个“格式正确但仍有改进空间”的起点。应以“接 RL 之后的表现”选 checkpoint。

</details>
