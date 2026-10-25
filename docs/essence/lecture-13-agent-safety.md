---
title: "7a · Agent 安全：权限、沙箱与监控"
description: "5 分钟掌握 Agent 安全：四类威胁模型、五类真实事故、沙箱边界、凭证代理、执行前监控与基率问题。"
pageClass: essence-page
outline: [2, 3]
---

# 7a · Agent 安全：权限、沙箱与监控

<div class="essence-deck">
<p class="essence-deck__thesis">Agent 安全首先是权限问题，不是模型口味问题：限制它能访问什么、能做什么。</p>
<p class="essence-deck__meta"><span>5 分钟</span><span>5 个概念</span><span>对应详细讲义 <a href="../notes/lecture-13-agent-safety">全文</a></span></p>
</div>

## 先记住

- **四类威胁模型要分开谈**：恶意用户、prompt injection、agent error、improper means。攻击者位置、用户是否配合、可用防线都不同，混在一起只会得出“加强对齐”这种没用的结论。
- **真实事故长得像运维事故**：删生产库、把私有文档寄到攻击者服务器、发布 token 经共享缓存泄露、agent 从 Dockerfile 里抄答案。
- **安全是能力的一部分**：把工具全撤掉最安全也最没用；产品真正要决策的是“给多少权限、留多少人工闸门、容忍多高的失败率”。
- **监控必须在 tool call 执行前完成**。执行之后的检查只是日志，不是防线。

## 核心机制

沙箱的关键不在“有没有”，而在**边界画在哪**、**访问规则由谁控制**。隔离要沿三个维度做，缺一不可：

| 维度 | 要限制什么 | 只做一半的后果 |
|---|---|---|
| 文件与进程 | 能读哪些文件、控制哪些进程 | 读得到凭证，隔离形同虚设 |
| 网络 | 能连哪些服务、能上传什么 | 文件隔离了，仍有外传通道 |
| 资源 | 多少算力/存储、能跑多久 | 一次 run 拖垮机器或跑三天 |

两种架构：agent 与工具都在沙箱内，简单，但沙箱里必然有访问模型的凭证；agent 在外、只把工具放进沙箱，隔离更强，但实现复杂度会明显上升。无论选哪种，**访问规则、日志、停止开关都必须在 agent 的控制之外**。

凭证要短期、细粒度、可代理。Credential broker 让 agent 只拿短期 token 和 run ID，broker 校验后用主密钥调用上游，并单独记录事件。它能把“一次注入”的后果从“发版”降到“打个恶意标签”。

防御栈可以按时间顺序记：

<div class="flow">
  <div class="flow__step"><strong>设计时</strong><small>最小权限、短期 token、broker</small></div>
  <div class="flow__step"><strong>运行时</strong><small>文件/网络/资源隔离、干净状态</small></div>
  <div class="flow__step"><strong>执行前</strong><small>规则 + 模型检查、审批、阻断</small></div>
  <div class="flow__step"><strong>事后</strong><small>审计日志、复盘、改进防线</small></div>
</div>

## 最容易错的地方

- **把“藏好 API key”当权限控制。** key 一旦可用，agent 就能用它做任务之外的事；要限制的是它带来的访问权，而不只是可见性。
- **用平均安全分掩盖尾部风险。** 真实事故都在尾部；要按影响、频率、可逆性排序，不可逆动作单独设闸门。
- **以为高召回就等于可运营。** 在 1% 不安全的基率下，90% 召回、1% 误报的监控，189 条告警里只有 48% 是真的：

$$
\text{precision}=\frac{r\pi}{r\pi+f(1-\pi)}=\frac{0.9\times0.01}{0.9\times0.01+0.01\times0.99}\approx0.476
$$

这意味着每 10,000 次决策会产生大量待审告警，人审预算会直接决定监控能否上线。

## 30 秒自测

**1. 为什么“agent 和工具都放在沙箱里”有结构性漏洞？**

<details>
<summary>答案</summary>

agent 要活着就得能访问语言模型，沙箱里必然存在模型凭证；agent 翻到它就能拿去调用模型做别的事，而封掉网络又会让它自己也工作不了。

</details>

**2. 为什么 90% 召回的监控可能只有 48% 的精确率？**

<details>
<summary>答案</summary>

坏事在真实流量里很稀有（基率低），大量安全决策中的少量误报会累积成可观的假告警，稀释真告警的比例；精确率取决于召回、误报与基率三者。

</details>
