---
title: "1b · Tool Use：把语言变成动作"
description: "5 分钟掌握 Tool Use：extend 与 facilitate、五层系统、schema 如何进入 prompt、约束解码的边界，以及 provider 差异。"
pageClass: essence-page
outline: [2, 3]
---

# 1b · Tool Use：把语言变成动作

<div class="essence-deck">
<p class="essence-deck__thesis">模型只负责“提议”一次调用；是否执行、怎么执行，由模型之外的 harness 决定。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-02-tool-use">全文</a></span></p>
</div>

## 先记住

- **工具只有两类收益**：extend（参数里根本没有的信息或动作）与 facilitate（模型能做，但外部程序更快、更稳）。该不该调，本质是拿收益换延迟、成本、失败率与风险。
- **工具调用是一段 token 续写**：schema 通过 chat template 进入 prompt，模型按自己的协议吐出调用块。Qwen、Mistral、DeepSeek 的格式互不通用。
- **约束解码保证形式，不保证语义**：JSON Schema → 文法 → token mask 能消灭语法错误，但错的城市、错的参数、错的工具依然会发生。

## 核心机制

整条工具链可以压成五层，每层有自己的失败模式：

| 层 | 做什么 | 典型失败 |
|---|---|---|
| 能力层 | 决定用哪个工具 | 选错工具、漏调、多调 |
| 机制层 | schema 进 prompt，模型出调用，harness 分发 | 协议不匹配、call ID 配错 |
| 约束层 | 用文法掩码保证格式合法 | 形式正确但语义错误 |
| 接口层 | REST / OpenAPI / MCP 暴露能力 | 凭据落进 agent、权限过宽 |
| 系统层 | 编排依赖、并发、评测与成本 | 顺序错、超时、provider 差异 |

最关键的一步是 **call ID**：模型生成的参数里没有可靠的身份，API 层给每次调用附加唯一 ID；工具结果必须按这个 ID 配回对应调用，并行调用时尤其不能靠顺序猜。

<div class="flow">
  <div class="flow__step"><strong>Schema</strong><small>工具定义进 prompt</small></div>
  <div class="flow__step"><strong>Decode</strong><small>模型按协议生成调用</small></div>
  <div class="flow__step"><strong>Validate</strong><small>harness 校验结构与权限</small></div>
  <div class="flow__step"><strong>Execute</strong><small>真正调用外部程序</small></div>
  <div class="flow__step"><strong>Pair</strong><small>按 call ID 回填 observation</small></div>
</div>

接口有两条常见路线：直接 REST 简单、OpenAPI 自带 schema，但凭据容易落进 agent 的 shell；MCP 多一层 server，可以做凭据代理，代价是多一个组件、多一层延迟。

## 最容易错的地方

- **把 schema 当正确性保证。** 它只约束语法、结构、类型与枚举，不负责“这个参数在业务上对不对”。
- **跨模型复用解析器。** 在 DeepSeek 上写好的正则，换到 Qwen 往往不报错，只是解析出空调用，然后 agent 空转。
- **只比较模型，不记录 provider。** 同一个模型换服务商，工具调用错误率可以从 15.1% 到 0.01%；量化、投机解码、是否实现约束解码都会改变结果。

## 30 秒自测

**1. 约束解码解决了什么？没有解决什么？**

<details>
<summary>答案</summary>

解决“输出不符合 schema”这类形式错误，包括语法、字段、类型与枚举值；不解决工具选择、参数语义、业务合理性与任务是否成功。

</details>

**2. 为什么并行工具调用必须依赖 call ID？**

<details>
<summary>答案</summary>

多个调用同时返回时，结果顺序不保证与请求顺序一致；只有调用时分配的唯一 ID 能把结果准确配回对应调用，避免张冠李戴。

</details>
