---
title: 精华版 · 75 分钟串起 AI Agents
description: CMU 11-768 AI Agents 精华版：15 讲压缩成 15 张速读卡，用 75 分钟建立 Agent 的核心知识骨架。
pageClass: essence-page essence-home
outline: [2, 3]
---

# 用 75 分钟，搭起 AI Agents 的知识骨架

<p class="brief-lead">15 讲详细讲义，压缩成 15 张速读卡。每讲保留一个核心判断、一条机制链、两三个易错点；先建立骨架，再按需回到详细讲义填细节。</p>

<div class="brief-actions">
  <a class="brief-btn" href="./lecture-01-agents">从 1a 开始</a>
  <a class="brief-btn brief-btn--ghost" href="#lectures">先看 15 讲目录</a>
</div>

## 三条学习路径 {#paths}

| 路径 | 时间 | 读什么 |
|---|---|---|
| 考前速通 | 15 分钟 | 只读下面的六个判断与每讲的一句话，先建立索引。 |
| 主线通读 | 75 分钟 | 按模块顺序读完 15 张速读卡，每张 4–6 分钟。 |
| 深入补齐 | 3 小时 | 速读卡 → 对应详细讲义 → 自测题，重点补推导、实验数字与论文出处。 |

## 一张图：Agent 是系统 {#system}

<div class="stack-map">
  <div class="stack-map__row">
    <span class="stack-map__label">模型与循环</span>
    <div class="stack-map__body"><strong>策略在历史上下一步动作</strong><p>观察 → 推理 → 动作 → 新观察。循环可以很短，终止条件必须显式设计。</p><em>ReAct · Plan Mode · workflow</em></div>
  </div>
  <div class="stack-map__row">
    <span class="stack-map__label">上下文</span>
    <div class="stack-map__body"><strong>模型这一次能看见什么</strong><p>系统提示、任务、工具描述、历史与观测。长了要压，压了可能忘。</p><em>KV cache · compaction · memory</em></div>
  </div>
  <div class="stack-map__row">
    <span class="stack-map__label">Harness 与工具</span>
    <div class="stack-map__body"><strong>把 token 变成真实动作</strong><p>解析调用、校验 schema、执行、把结果配回调用，并处理错误与权限。</p><em>schema · call ID · retry · approval</em></div>
  </div>
  <div class="stack-map__row">
    <span class="stack-map__label">环境与沙箱</span>
    <div class="stack-map__body"><strong>动作在哪里发生、能碰到什么</strong><p>仓库、浏览器、桌面、API；文件、网络、算力与时间的边界。</p><em>Docker · VM · browser · MCP</em></div>
  </div>
  <div class="stack-map__row">
    <span class="stack-map__label">评测与训练</span>
    <div class="stack-map__body"><strong>怎么知道它行，怎么让它更行</strong><p>验证器、judge、rubric；SFT 写进权重，RL 用自己的尝试继续磨。</p><em>verifier · rubric · SFT · RL</em></div>
  </div>
</div>

## 六个判断 {#claims}

<div class="claims">
  <div class="claim"><strong>Agent 是系统，不是模型。</strong><p>同一个模型换 harness、沙箱与评测，表现可以差一个量级；长程任务里，错误几乎总是多层同时失效。</p></div>
  <div class="claim"><strong>工具调用是 token，能力是训练出来的。</strong><p>模型生成“工具名 + 参数”的 token 序列，harness 负责执行。格式、选择与参数都来自训练数据与约束解码，不是天生会。</p></div>
  <div class="claim"><strong>上下文的成本由循环决定，不由单次调用决定。</strong><p>每轮都要重新处理历史，累计输入随轮数二次增长。容量（用得上）与效率（付得起）必须分开优化。</p></div>
  <div class="claim"><strong>不训练也能学习，但代价是数据管理。</strong><p>skill、memory、文件与数据库都能改变行为；它们可检查、可移植，但写入、检索、冲突与过期都得自己管。</p></div>
  <div class="claim"><strong>SFT 获得能力，RL 锐化能力，奖励决定上限。</strong><p>SFT 从录制的轨迹学，RL 从自己的 rollout 学。没有 SFT 的 RL 几乎推不动基座，奖励写错则会精准地优化错误目标。</p></div>
  <div class="claim"><strong>安全与评测都是系统设计。</strong><p>安全不是拒答，而是最小权限、可重置环境与执行前检查；评测不是跑分，而是用对的验证器回答“它到底能不能用”。</p></div>
</div>

## 15 讲速读 {#lectures}

<div class="module">
  <div class="module__head"><h3>导论与 Agent 能力</h3><span>5 讲 · 约 25 分钟</span></div>
  <a class="lecture-row" href="./lecture-01-agents">
    <span class="lecture-row__no">1a</span>
    <span class="lecture-row__body"><strong>课程概览：什么是 Agent？</strong><span>Agent = 模型在循环里；能力上限由模型、harness、环境与评测共同决定。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-02-tool-use">
    <span class="lecture-row__no">1b</span>
    <span class="lecture-row__body"><strong>Tool Use：把语言变成动作</strong><span>模型只提议调用，harness 负责执行；工具调用在实现上就是 token。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-03-long-context">
    <span class="lecture-row__no">2a</span>
    <span class="lecture-row__body"><strong>长上下文：容量与成本</strong><span>上下文成本随轮数二次增长；容量与效率要分开优化，缓存和压缩各管一半。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-04-memory-and-skills">
    <span class="lecture-row__no">2b</span>
    <span class="lecture-row__body"><strong>Skills &amp; Memory：不从头开始</strong><span>不把经验写进权重，也能让 agent 变强；skill 与 memory 是可检查的外部工件。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-05-planning">
    <span class="lecture-row__no">3a</span>
    <span class="lecture-row__body"><strong>Planning 与多 Agent</strong><span>计划是对未来行为的显式表示；多 agent 的收益来自更好的分解与重规划。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
</div>

<div class="module">
  <div class="module__head"><h3>应用领域</h3><span>3 讲 · 约 15 分钟</span></div>
  <a class="lecture-row" href="./lecture-06-coding-agents">
    <span class="lecture-row__no">3b</span>
    <span class="lecture-row__body"><strong>Coding Agent</strong><span>核心循环是 localize → edit → verify；评测靠执行，工具设计直接影响成绩。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-07-computer-use-agents">
    <span class="lecture-row__no">4a</span>
    <span class="lecture-row__body"><strong>Computer Use Agent</strong><span>CUA 在人类界面上工作；动作、结果、过程三层评测不能混成一个分数。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-10-deep-research-agents">
    <span class="lecture-row__no">5b</span>
    <span class="lecture-row__body"><strong>Deep Research Agent</strong><span>多轮检索与综合；长答案要用 rubric 与引用支撑来评，不能靠相似度。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
</div>

<div class="module">
  <div class="module__head"><h3>训练方法</h3><span>4 讲 · 约 20 分钟</span></div>
  <a class="lecture-row" href="./lecture-08-sft">
    <span class="lecture-row__no">4b</span>
    <span class="lecture-row__body"><strong>SFT：把轨迹写进权重</strong><span>模板、掩码与数据选择比超参数更关键；SFT 是 RL 的冷启动，不是终点。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-09-rl-basics">
    <span class="lecture-row__no">5a</span>
    <span class="lecture-row__body"><strong>RL 基础：从 REINFORCE 到 GRPO</strong><span>RL 只做三件事：采样、打分、按权重更新；各算法只差一个权重 w_t。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-11-rl-advanced">
    <span class="lecture-row__no">6a</span>
    <span class="lecture-row__body"><strong>RL 高级：信用、异步与奖励</strong><span>agentic RL 的难点是信用分配、陈旧 rollout 与奖励可靠性，不是公式本身。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-12-rl-systems">
    <span class="lecture-row__no">6b</span>
    <span class="lecture-row__body"><strong>RL 系统：两个引擎</strong><span>RL 系统 = 推理引擎 + 训练引擎 + 两者之间的接缝；轨迹要以 token 传输。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
</div>

<div class="module">
  <div class="module__head"><h3>安全与框架</h3><span>3 讲 · 约 15 分钟</span></div>
  <a class="lecture-row" href="./lecture-13-agent-safety">
    <span class="lecture-row__no">7a</span>
    <span class="lecture-row__body"><strong>Agent 安全：权限、沙箱与监控</strong><span>安全是权限与边界设计；不可逆动作必须有人工闸门，检查要发生在执行前。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-14-openhands">
    <span class="lecture-row__no">7b</span>
    <span class="lecture-row__body"><strong>OpenHands：harness 的工程学</strong><span>产品能不能用，往往取决于工具集、上下文、隔离与界面；默认先试单 agent。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
  <a class="lecture-row" href="./lecture-15-orchestration-and-monitoring">
    <span class="lecture-row__no">9a</span>
    <span class="lecture-row__body"><strong>编排与监控：把行为写进图</strong><span>工作流把决策写进代码；trace 与监控让“应该发生什么”变成“实际发生了什么”。</span></span>
    <span class="lecture-row__meta">5 分钟</span>
  </a>
</div>

## 一张对照表 {#contrast}

| 容易混淆 | 关键区别 |
|---|---|
| 模型 / Harness / 系统 | 模型给概率，harness 给循环与约束，系统给环境与评测；三者不可互相替代。 |
| 容量 / 效率 | 容量问“远处的证据用不用得上”，效率问“每轮历史付不付得起”。 |
| SFT / RL | SFT 从录制的轨迹学，RL 从自己的 rollout 学；一个给先验，一个给改进方向。 |
| 单 Agent / 多 Agent | 单 agent 共享上下文；多 agent 用并行、独立评审或成本控制换协调成本。 |
| 结果评测 / 过程评测 | 前者看终态对不对，后者看有没有违规、绕路或不可逆操作。 |
| 静态评测 / 端到端 | 前者在固定观测上测单步动作，后者让 agent 真跑一遍再检查环境终态。 |

## 怎么继续 {#next}

- 每张速读卡末尾有两道自测；先答，再展开对照。
- 需要推导、实验数字和论文出处，点每页顶部的「详细讲义」。
- 顶部导航随时在「课程笔记」与「精华版」之间切换；读某一讲时，两边的页面一一对应。
