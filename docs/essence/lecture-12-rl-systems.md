---
title: "6b · RL 系统：两个引擎"
description: "5 分钟掌握 RL 系统：推理引擎与训练引擎、一个 step 的五个阶段、权重同步、序列延展、TITO，以及三条系统设计路线。"
pageClass: essence-page
outline: [2, 3]
---

# 6b · RL 系统：两个引擎

<div class="essence-deck">
<p class="essence-deck__thesis">RL 系统 = 推理引擎 + 训练引擎 + 两者之间的接缝；复杂度不在梯度，而在环境、历史结构与数据传输。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-12-rl-systems">全文</a></span></p>
</div>

## 先记住

- **策略梯度只有一行公式，但要跑起来需要一整套系统**：`forward` / `backward` / `optim_step` 之外，还必须有 `env.step`、`env.verify` 和 agent harness。
- **同一个模型被拆成两个引擎**：推理引擎（vLLM、SGLang）做 decode，逐 token、无梯度、围着 KV cache 转；训练引擎（Megatron、FSDP2）做 prefill 式并行前反向，要 autograd、要激活。
- **两个引擎之间的接缝才是 bug 温床**：权重同步、为推理布局 reshard、MoE 路由不一致、数值差异造成的隐性 off-policy。
- **agentic RL 的两个尖刺**：多轮轨迹必须满足 sequence extension（前缀严格保留），否则一条轨迹会裂成多个 datapoint；轨迹必须以 token 而不是 string 传输（TITO）。

## 核心机制

一个训练 step 可以拆成五个阶段，任何一步的等待都会变成 GPU 空转：

<div class="flow">
  <div class="flow__step"><strong>Sample</strong><small>推理引擎 + harness + 环境</small></div>
  <div class="flow__step"><strong>Verify</strong><small>跑测试/检查终态，给 reward</small></div>
  <div class="flow__step"><strong>Forward</strong><small>训练引擎重算 logprob</small></div>
  <div class="flow__step"><strong>Backward</strong><small>反传，保留计算图</small></div>
  <div class="flow__step"><strong>Optim + Sync</strong><small>更新权重，reshard 回推理侧</small></div>
</div>

为什么必须分成两个引擎？因为工作负载的硬件画像几乎相反：decode 每步读全部权重与不断增长的 KV cache，访存密集；训练整条序列并行矩阵乘，计算密集。显存账单让分裂成为物理必需：Llama-3-8B 的 KV cache 每 token 约 128 KB，一条 32K 轨迹约 4 GB，64 条就是 256 GB——一张 80 GB 的卡连一小批轨迹的 KV 都放不下。

权重同步也有规模问题：1T 参数 bf16 约 2TB，全量广播会打爆网络；但 bf16 下约 99% 的参数在两次更新之间逐比特未变，只同步 delta 可以降到 20–30 GB。收到后仍需按推理布局 reshard。

更隐蔽的是序列契约。主流 chat template 在渲染下一轮 user 时可能删掉历史 reasoning——第 2 轮的 prompt 不再以第 1 轮为前缀，前缀缓存失效，多轮也无法拼成一个 datapoint。所以 agent RL 框架普遍自带 renderer，把“如何渲染消息”从模型厂商的默认行为里接管过来。

TITO（Token-In, Token-Out）则是另一条硬约束：detokenize 是多对一的，训练侧重新 tokenize 会得到与推理不同的 token，直接制造 off-policy 与 loss spike。轨迹必须以 token ID 在引擎之间传输。

## 最容易错的地方

- **把 RL 框架当普通分布式训练。** 环境语义不统一、harness 历史不规整、两个引擎的接缝，才是复杂度的来源。
- **把 chat template 当格式化细节。** 它决定缓存能否命中、batch 能否合并、梯度是否对应采样时的分布，是训练正确性的一部分。
- **以为异步是免费的。** 异步提高吞吐，但引入 staleness 与 off-policy；必须用重要性比率、裁剪与监控来兜底。

## 30 秒自测

**1. 为什么不能用一个引擎同时做推理和训练？**

<details>
<summary>答案</summary>

推理是 decode 为主、无梯度、需要大 KV cache；训练是 prefill 式并行、需要 autograd 与激活。两者的显存与计算画像相反，混在一起会互相挤占资源。

</details>

**2. 为什么轨迹要以 token 传输？**

<details>
<summary>答案</summary>

字符串 detokenize 再 tokenize 不保证得到相同 token；训练侧与推理侧的 token 序列一旦不同，logprob 与梯度就对应不上，造成隐性 off-policy 与训练不稳定。

</details>
