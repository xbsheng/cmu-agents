---
title: "6a · RL 高级：信用、异步与奖励"
description: "5 分钟掌握 agentic RL 的真实难点：turn-level 信用、GAE、异步 rollout 与重要性比率、裁剪/KL/熵，以及奖励黑客与假阴性。"
pageClass: essence-page
outline: [2, 3]
---

# 6a · RL 高级：信用、异步与奖励

<div class="essence-deck">
<p class="essence-deck__thesis">Agentic RL 的难点不在算法，而在信用分配、陈旧数据和奖励可靠性。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-11-rl-advanced">全文</a></span></p>
</div>

## 先记住

- **最终奖励只有 0/1 时，REINFORCE 对失败样本零更新**；组基线让失败也有负权重，但整条轨迹共享同一个权重，成功轨迹里的错误动作照样被加强。
- **Turn-level 信用需要 value function**：critic 学 $V(h)\approx$ 期望 reward-to-go，TD 误差衡量“这一步让局面变好还是变坏”，GAE 再把后续误差按 $\lambda$ 折价加回来。
- **异步 RL 是 agentic RL 的默认选择**，代价是 rollout 与 learner 不是同一个策略；整条轨迹的重要性比率是每一步比率的乘积，单步差 5%，100 步后就是 $1.05^{100}\approx132$。
- **奖励比算法更容易出错**：无效组、验证器假阴性/假阳性、奖励黑客，都会让模型学到“拿分”而不是“解决问题”。

## 核心机制

TD 误差与 GAE 把“这一步好不好”从最终奖励里拆出来：

$$
\delta_t = r_{t+1} + V_\phi(h_{t+1}) - V_\phi(h_t)
$$

$$
\hat A_t=\delta_t+\lambda\delta_{t+1}+\lambda^2\delta_{t+2}+\cdots=\delta_t+\lambda\hat A_{t+1}
$$

$\lambda=1$ 时退化为蒙特卡洛，只剩最终奖励；$\lambda=0$ 时退化为单步 TD，偏差大但方差小。$\lambda$ 是“用多少偏差换多少方差”的旋钮。

异步训练时，比率取哪一段决定了算法的稳定性：

| 方法 | 权重使用的动作范围 | 特点 |
|---|---|---|
| PPO / GRPO | 只有当前动作 $a_t$ | 便宜、方差低，但不是无偏的轨迹权重 |
| CTPO | $a_0,\dots,a_t$（到当前为止） | 更接近正确修正，方差随 $t$ 增长 |
| Full ratio | 全部 $T$ 个动作 | 理论最“正确”，实际爆炸 |
| GSPO | 全部动作，按长度归一化 | 量级回到 $O(1)$，可用 |

<div class="flow">
  <div class="flow__step"><strong>Rollout μ</strong><small>异步 worker 产生轨迹</small></div>
  <div class="flow__step"><strong>Ratio</strong><small>πθ / μ，取当前或累积</small></div>
  <div class="flow__step"><strong>Clip</strong><small>限制单步更新幅度</small></div>
  <div class="flow__step"><strong>KL / Entropy</strong><small>防跑偏，保探索</small></div>
  <div class="flow__step"><strong>Update</strong><small>批量更新 learner</small></div>
</div>

## 最容易错的地方

- **只看训练奖励上涨。** 奖励涨而独立指标不动，几乎一定是找到了捷径；必须同时看未见任务、成本与失败模式。
- **把成功轨迹里的每个动作都当成好动作。** 最终 reward 只说明整条轨迹成功，里面的弯路与错误动作也被一起加强了。
- **以为假阴性只是噪声。** 正确解被判错会让模型为无关的措辞差异做优化，严重时让 benchmark 分数卡在平台上不去了。

## 30 秒自测

**1. 为什么整条轨迹的重要性比率会爆？**

<details>
<summary>答案</summary>

轨迹比率是每一步比率的乘积，随步数指数增长；单步只差 5%，100 步后约 132，少数样本会主导整个 batch，方差大到训练无法稳定。

</details>

**2. 验证器假阴性有什么后果？**

<details>
<summary>答案</summary>

等价解拿到不同分数，模型在为无关的实现细节做优化；严重时正确解被系统性拒绝，分数卡在某个上限，而这与模型能力无关。

</details>
