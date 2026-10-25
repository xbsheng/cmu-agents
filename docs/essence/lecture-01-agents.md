---
title: "1a · 课程概览：什么是 Agent？"
description: "5 分钟掌握 1a 的核心：agent 的四要素、工具调用即 token、六项能力与两条建设路线，以及为什么 agent 是系统而不是模型。"
pageClass: essence-page
outline: [2, 3]
---

# 1a · 课程概览：什么是 Agent？

<div class="essence-deck">
<p class="essence-deck__thesis">Agent 不是“更聪明的模型”，而是模型、循环、工具与环境组成的系统。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>4 个概念</span><span>对应详细讲义 <a href="../notes/lecture-01-agents">全文</a></span></p>
</div>

## 先记住

- **经典定义仍然成立**：通过传感器感知环境，通过执行器作用于环境。今天只是传感器变成文件、网页、截图，执行器变成 shell、编辑器和鼠标键盘。
- **工具调用就是 token**：模型生成“工具名 + 参数”的 token 序列，harness 解析、执行，再把 observation 塞回上下文。
- **六项能力、两条路线**：工具调用、长上下文、可定制、任务管理、环境理解、安全；每一项都可以用训练或 harness 工程解决。

## 核心机制

一次决策的输入只有四块：**Context**（系统提示）、**Task**（用户请求）、**Tools**（工具定义）、**History**（此前的动作与观测）。模型输出 reasoning 加 tool call，环境返回 observation，历史继续增长：

$$
a_t \sim \pi_\theta(\cdot \mid \tau_t), \qquad o_{t+1} = E(a_t), \qquad \tau_{t+1} = \tau_t \oplus (a_t, o_{t+1})
$$

循环本身可以不到二十行；真正决定成败的是循环周围的事：上下文怎么截断、工具怎么描述、错误怎么重试、什么时候停。

<div class="flow">
  <div class="flow__step"><strong>Context + Task</strong><small>固定指令与本次任务</small></div>
  <div class="flow__step"><strong>Tools</strong><small>schema 进入 prompt</small></div>
  <div class="flow__step"><strong>Model</strong><small>reasoning + tool call</small></div>
  <div class="flow__step"><strong>Environment</strong><small>执行并返回 observation</small></div>
  <div class="flow__step"><strong>History</strong><small>结果回填，进入下一轮</small></div>
</div>

## 最容易错的地方

- **把自主性当二元开关。** 真实设计是“完全自主 / 先问再做 / 永远别碰”的分级，按影响、频率与可逆性决定。
- **把 agent 等同于模型。** 同一个模型换 harness、沙箱与评测，表现可以差一个量级。
- **忘记设计终止条件。** “结束”也应该是一个显式动作，否则只能靠 token 预算硬截断。

## 30 秒自测

**1. 为什么说“tool call 只是 token”？这对工程有什么影响？**

<details>
<summary>答案</summary>

模型不是在调用一个结构化 API，而是在续写一段带特殊标记的文本。因此工具格式必须被训练进模型，解析器也不能跨模型复用；换模型往往要换模板与解析逻辑。

</details>

**2. 六项能力中，哪一项最容易被低估？**

<details>
<summary>答案</summary>

环境理解。GUI、时序、实验图像等观测形态与文本差异很大，需要匹配形态的数据与领域环境；很多失败不是“不会推理”，而是“没看懂环境”。

</details>
