---
title: "4a · Computer Use Agent"
description: "5 分钟掌握 CUA：定义、动作层/结果层/过程层、四层评测谱系、交错视觉历史，以及预训练→SFT→RL 的训练路径。"
pageClass: essence-page
outline: [2, 3]
---

# 4a · Computer Use Agent

<div class="essence-deck">
<p class="essence-deck__thesis">CUA 在人类使用的界面上工作；循环九年没变，真正的瓶颈是“怎么知道它做得好不好”。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-07-computer-use-agents">全文</a></span></p>
</div>

## 先记住

- **定义不是“会调浏览器”**：观测是渲染后的 GUI 截图，动作是点击、滚动、输入、滑动，反馈是界面变化。它继承了人类的通用性，也继承了 GUI 的脆弱性。
- **三层成功标准**：动作层（点得准不准）、结果层（事情办成没有）、过程层（有没有违规）。它们测的是不同能力，不能混成一个数字。
- **评测有四层**：静态动作匹配、web 端到端、桌面/移动端端到端、长时程工作流。越往上越接近真实价值，也越贵、越难复现、奖励越稀疏。
- **训练是三段式**：预训练注入 grounding 与控制语料，SFT 克隆轨迹，RL 在可重置环境里用 verifier 打分。

## 核心机制

CUA 的评测谱系值得直接背下来：

| 类别 | 交互形态 | 评测器 | 主要盲区 |
|---|---|---|---|
| 02A 静态 | 固定观测上预测一个动作 | 目标框/元素匹配 | 单步正确 ≠ 任务完成 |
| 02B web 端到端 | 浏览器里完成任务 | 状态检查或 LLM judge | 验证器覆盖不足、网页漂移 |
| 02C 桌面/移动端 | 跨应用、跨系统状态 | 应用级自定义检查 | 环境构建贵、调度复杂 |
| 02D 长时程 | 数十分钟到数小时 | rubric/过程分 + 终局判定 | 奖励稀疏、判卷噪声、成本高 |

模型侧其实很干净：一个 VLM 读入交错的视觉—动作历史，输出下一个动作：

$$
\pi_\theta(a_t \mid \text{goal},\ o_{\le t},\ a_{<t})
$$

动作空间因模型而异：PyAutoGUI、原生 tool call、0–999 归一化坐标、XML/JSON 都有。坐标归一化提升跨分辨率迁移，代价是精度损失。纯截图方案更通用，因为桌面软件根本没有 HTML；前沿模型在可用时会混用 accessibility tree。

<div class="flow">
  <div class="flow__step"><strong>Pretrain</strong><small>grounding + 动作预测</small></div>
  <div class="flow__step"><strong>SFT</strong><small>人类/合成轨迹行为克隆</small></div>
  <div class="flow__step"><strong>RL</strong><small>可重置环境 + verifier</small></div>
  <div class="flow__step"><strong>Evaluate</strong><small>动作 / 结果 / 过程</small></div>
</div>

CUA-Gym 是一个典型：110 个 mock 环境、约 32K 条 RLVR 元组，3,578 条 SFT demo 后接 GSPO，OSWorld 从 62.2% 提升到 72.6%——+10 个点来自后训练，而不是换基座。

## 最容易错的地方

- **用 02A 的分数论证产品可用性。** 静态 grounding 只说明“看得准”，不说明“能完成任务”。
- **只看结果，不看过程。** agent 可以为了满足验证器把所有商品加入购物车；过程检查才能发现这类捷径。
- **以为 RL 可以直接在真实网站上做。** 真钱、真人、无法干净回滚；RL 需要可反复重置的副本环境。

## 30 秒自测

**1. 为什么 CUA 的评测必须真正 rollout？**

<details>
<summary>答案</summary>

动作会改变界面状态，下一步观测依赖上一步执行结果；只看静态输入输出无法判断任务是否完成，也无法发现违规操作。

</details>

**2. judge 的一致性为什么不够？**

<details>
<summary>答案</summary>

judge 与人类的判卷一致率即使有 85%，在几百道题上仍会引入几十题的噪声；比较只差几个点的系统时，这点噪声足以改变结论。judge 还需要人类标注来标定。

</details>
