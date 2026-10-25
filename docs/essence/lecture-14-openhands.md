---
title: "7b · OpenHands：harness 的工程学"
description: "5 分钟掌握 OpenHands：两年历史、batteries included 的 SDK、workspace 作为参数、单 agent 优先、多 agent 的三个收益，以及自动化闭环。"
pageClass: essence-page
outline: [2, 3]
---

# 7b · OpenHands：harness 的工程学

<div class="essence-deck">
<p class="essence-deck__thesis">一个 agent 能不能用，往往取决于工具集、上下文、隔离与界面，而不是换一个更强的模型。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-14-openhands">全文</a></span></p>
</div>

## 先记住

- **agentic coding 只用了两年**：2023 年还是 HumanEval 式补全；2024 年 3 月 Devin 的演示引爆想象，OpenDevin 两周后出现；2024 年底模型跨过门槛；2026 年主题变成部署、权限与可验证产物。
- **SDK 的立场是“开箱即用的默认值 + 可拆卸”**：模型、工具、状态、workspace 都有默认实现，也都可以替换。与“只给内核、其余全靠扩展”的极简路线相反。
- **执行位置是一个参数**：同一个 `workspace` 抽象可以指向本地目录、Docker 容器或远端 server，上层 conversation API 不变。
- **默认先试单 agent**：修 bug 这类高度耦合的任务，复现、定位、编辑、测试共享同一份上下文；拆成角色流水线，交接点会成为新的失败来源。

## 核心机制

Conversation 把三件事绑在一起：**workspace**（文件与执行环境）、**conversation**（任务、动作、观察的记录）、**run**（动作—观察循环）。

<div class="flow">
  <div class="flow__step"><strong>Workspace</strong><small>本地 / Docker / 远端 server</small></div>
  <div class="flow__step"><strong>Agent</strong><small>模型 + 小工具集 + 指令</small></div>
  <div class="flow__step"><strong>Conversation</strong><small>消息、动作、观察</small></div>
  <div class="flow__step"><strong>Run</strong><small>循环直到完成或中断</small></div>
  <div class="flow__step"><strong>Artifact</strong><small>diff、测试结果、交付物</small></div>
</div>

工具集刻意做小：编辑文件、运行命令、浏览。三个动词覆盖源码、配置、文档、依赖、测试与视觉检查；小工具集的好处是组合性，代价是错误空间变大，所以**动作空间越通用，隔离边界越重要**。

上下文压缩（condenser）是这套框架最早押注的技术之一：把较早的事件摘要化，保留原始指令与最近工作，用文件与测试结果作为事实证据，而不是逐条屏蔽历史动作。

多 agent 只在三种情况下划算：**并行**（多个独立 PR）、**独立评审**（让不带原决策理由的 agent 来看，判断会更严厉）、**成本控制**（便宜模型做实现、贵模型做规划）。三者都要付出上下文交接与整合的代价。

自动化则把 agent 从“对话工具”变成“生产设施”：trigger → context → run → artifact → check，构成一次可审计的运行；重复运行积累的数据又能反过来改进 prompt（SkillRefiner）。

## 最容易错的地方

- **认为多 agent 一定更强。** 任务不能无损切分时，拆开只是在制造信息瓶颈；收益要来自并行、独立评审或成本，而不是“看起来更有结构”。
- **把“模型无关”当免费美德。** 它意味着放弃针对单一模型的深度调优；工具描述与错误恢复只能取多数模型都能理解的共同子集。
- **把安全当事后补的模块。** 确认策略、沙箱边界、权限范围必须在 SDK 设计时就作为一等公民，否则默认“什么都能做”，后来的限制都会变成体验倒退。

## 30 秒自测

**1. 为什么修 bug 时单 agent 常优于角色流水线？**

<details>
<summary>答案</summary>

复现时看到的栈追踪、定位时读到的调用链、编辑时考虑的兼容性，是同一份上下文的不同侧面；拆给不同角色，每次交接都要决定传什么、丢什么，反而制造信息瓶颈。

</details>

**2. 多 agent 的三个合理收益是什么？**

<details>
<summary>答案</summary>

并行（独立任务缩短墙钟时间）、独立评审（不带原决策理由的视角更严厉）、成本控制（合适任务用更便宜的模型，或让子 agent 只回传结论）。

</details>
