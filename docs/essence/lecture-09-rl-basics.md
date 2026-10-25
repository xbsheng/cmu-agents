---
title: "5a · RL 基础：从 REINFORCE 到 GRPO"
description: "5 分钟掌握 RL 基础：SFT 的三个失配、策略梯度的推导、baseline 与 advantage、GRPO/DrGRPO，以及所有方法统一的权重视角。"
pageClass: essence-page
outline: [2, 3]
---

# 5a · RL 基础：从 REINFORCE 到 GRPO

<div class="essence-deck">
<p class="essence-deck__thesis">RL 只做三件事：采样、打分、按分数调整参数；所有算法最终只差一个权重 w_t。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-09-rl-basics">全文</a></span></p>
</div>

## 先记住

- **SFT 有三个失配**：任务失配（成功路径不唯一，坏动作与好动作没区别）、数据失配（失败轨迹被丢掉）、exposure bias（训练只见示教历史，推理面对自己的错误历史）。
- **策略梯度的难点是“采样与环境都不可导”**：log-derivative trick 把梯度变成“回报 × SFT 梯度”的期望，所以实现上只是给 SFT loss 加 mask、再乘一个标量。
- **reward 的绝对值没有意义，相对值才有**：减去 baseline 不改变梯度期望，却能显著降低方差。
- **GRPO 用“同一道题采 G 次”的组内均值代替 value model**；DrGRPO 再去掉组内标准差与长度归一化，修掉难度偏置与长度偏置。

## 核心机制

REINFORCE 的结论可以直接写成可实现的损失：

$$
\nabla_\theta J = \mathbb{E}_{\tau \sim p_\theta}\left[R(\tau)\sum_{t} \nabla_\theta \log \pi_\theta(a_t \mid h_t)\right]
$$

落到实现上，它就是：

$$
L_{\text{PG}} = -R(\tau)\sum_{t:\,m_t=1}\log \pi_\theta(u_t \mid u_{<t})
$$

也就是说，**策略梯度 = 带 mask 的 SFT loss × 回报**。真正的工程难点在别处：保证用于更新的 log prob 与产生轨迹的策略一致；处理 rollout 与训练的串行等待。

GRPO 对每个任务采 $G$ 条轨迹，用组内均值当 baseline：

$$
\hat A_j = \frac{R(\tau_j) - \bar R}{\sigma_R}, \qquad \bar R = \frac{1}{G}\sum_{j=1}^G R(\tau_j)
$$

这样失败轨迹第一次真正带上了负号。但组内标准差会放大“几乎全对/几乎全错”的题，长度归一化又会奖励“越长越错”；DrGRPO 把两者都去掉。

<div class="flow">
  <div class="flow__step"><strong>Sample</strong><small>当前策略采轨迹</small></div>
  <div class="flow__step"><strong>Score</strong><small>环境/验证器给 R(τ)</small></div>
  <div class="flow__step"><strong>Baseline</strong><small>减均值，得到 advantage</small></div>
  <div class="flow__step"><strong>Weight</strong><small>用 w_t 乘 log prob 梯度</small></div>
  <div class="flow__step"><strong>Update</strong><small>反向传播，更新策略</small></div>
</div>

| 方法 | 权重 $w_t$ | 直觉 |
|---|---|---|
| ReST-EM | 成功轨迹为 1，其余为 0 | 只模仿成功的自己 |
| REINFORCE | $R(\tau)$ | 按绝对回报加权 |
| GRPO / DrGRPO | $\hat A_j$ | 按“相对同题其他 rollout 的好坏”加权 |

## 最容易错的地方

- **朴素 REINFORCE 对失败轨迹零更新。** 二值 reward 下，失败轨迹的 $R=0$，整条轨迹没有梯度；baseline 才能让失败也提供负信号。
- **组内 reward 全相同。** 全 0 说明题太难，全 1 说明题太简单，减完均值后 advantage 全是 0；这是退化组，继续训练是浪费算力。
- **长度归一化让“越错越长”占便宜。** 按回答长度归一化会减轻长错误回答的惩罚，策略可能漂向又长又错的输出。

## 30 秒自测

**1. 为什么减去 baseline 不会引入偏差？**

<details>
<summary>答案</summary>

baseline 只依赖历史 $h_t$，不依赖被评估的动作；在给定历史下对动作求期望时，$\sum_a \pi(a|h)\nabla\log\pi(a|h)=0$，所以减 baseline 不改变梯度期望，只降低方差。

</details>

**2. GRPO 为什么能让失败轨迹也有梯度？**

<details>
<summary>答案</summary>

它用同一道题多次 rollout 的组内均值作 baseline；低于均值的失败轨迹得到负 advantage，于是“不要这么做”也能通过负权重进入损失。

</details>
