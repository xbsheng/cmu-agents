# 卡内基梅隆大学 11-768 · AI Agents (Fall 2026)

来源: [cmu-agents.com](https://www.cmu-agents.com) · Slides 已下载至 `slides/`

在线阅读：<https://xbsheng.github.io/cmu-agents/>

## 课程笔记

已整理 15 讲详细讲义（按模块）：

**导论与 Agent 能力**

- [1a · Course Overview](docs/notes/lecture-01-agents.md)
- [1b · Tool Use](docs/notes/lecture-02-tool-use.md)
- [2a · Long-Context Agents](docs/notes/lecture-03-long-context.md)
- [2b · Skills & Memory](docs/notes/lecture-04-memory-and-skills.md)
- [3a · Planning & Multi-Agent](docs/notes/lecture-05-planning.md)

**应用领域**

- [3b · Coding Agents](docs/notes/lecture-06-coding-agents.md)
- [4a · Computer Use Agents](docs/notes/lecture-07-computer-use-agents.md)
- [5b · Deep Research Agents](docs/notes/lecture-10-deep-research-agents.md)

**训练方法**

- [4b · SFT](docs/notes/lecture-08-sft.md)
- [5a · RL Basics](docs/notes/lecture-09-rl-basics.md)
- [6a · Advanced RL](docs/notes/lecture-11-rl-advanced.md)
- [6b · RL Systems](docs/notes/lecture-12-rl-systems.md)

**安全与框架**

- [7a · Agent Safety](docs/notes/lecture-13-agent-safety.md)
- [7b · OpenHands](docs/notes/lecture-14-openhands.md)
- [9a · Orchestration and Monitoring](docs/notes/lecture-15-orchestration-and-monitoring.md)（暂无录像，基于 slides）

## 精华版

15 讲各有一张 5 分钟速读卡，另有 75 分钟学习路线、系统栈与跨讲对照表：[精华版总览](docs/essence/index.md)。

在线阅读时，顶部导航可在「课程笔记」与「精华版」之间切换；每一讲的两种版本页一一对应。

## 本地校验

```bash
npm run docs:build
npm run docs:check
```

`docs:check` 会检查站内链接、幻灯片图片引用、sitemap 和 KaTeX 渲染错误；CI 在构建后自动执行。

## 课程安排

### 1a · Tue, Aug 25 — Course Overview: What Is an Agent?

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Introduction and Agent Capabilities
- Slides: [Lecture 1 slides](slides/lecture-01-agents.pdf)
- 录像: [Lecture 1 recording](https://www.youtube.com/watch?v=UwfjzyLnvMg&list=PLSN0qpDfUvTM&index=1)
- 阅读材料:
  - [Toolformer](https://arxiv.org/abs/2302.04761)
  - [ReAct](https://arxiv.org/abs/2210.03629)
  - [Mini-SWE-Agent](https://github.com/swe-agent/mini-swe-agent)

</details>

### 1b · Thu, Aug 27 — Agent Capabilities 1: Tool Use

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Introduction and Agent Capabilities
- Slides: [Lecture 2 slides](slides/lecture-02-tool-use.pdf)
- 录像: [Lecture 2 recording](https://www.youtube.com/watch?v=jXChFB4JSyw&list=PLSN0qpDfUvTM&index=2)
- 阅读材料:
  - [What Are Tools Anyway?](https://arxiv.org/abs/2403.15452)
  - [CodeAct](https://arxiv.org/abs/2402.01030)
  - [Toolformer](https://arxiv.org/abs/2302.04761)
  - [XGrammar](https://arxiv.org/abs/2411.15100)
- 参考资料:
  - [OpenAI Chat Completions API](https://platform.openai.com/docs/api-reference/chat/create)
  - [Hugging Face Chat Templates](https://huggingface.co/docs/transformers/chat_templating)
  - [Qwen2.5 Chat Template](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct/blob/main/tokenizer_config.json)
  - [Berkeley Function-Calling Leaderboard V4](https://gorilla.cs.berkeley.edu/leaderboard.html)
  - [BFCL V4 Methodology](https://gorilla.cs.berkeley.edu/blogs/15_bfcl_v4_web_search.html)
  - [OpenRouter Provider Analytics](https://openrouter.ai/)
  - [OpenAI Function Calling Guide](https://developers.openai.com/api/docs/guides/function-calling)
  - [Qwen3.8 Tool-Call Template](https://huggingface.co/Qwen/Qwen3.8-27B/blob/main/tokenizer_config.json)
  - [Mistral Small 4 Model Card](https://huggingface.co/mistralai/Mistral-Small-4-119B-2603)
  - [Mistral Tool-Call Tokenization Guide](https://github.com/mistralai/cookbook/blob/main/concept-deep-dive/tokenization/tool_calling.md)
  - [DeepSeek V3.2 Tool-Call Encoding](https://huggingface.co/deepseek-ai/DeepSeek-V3.2/blob/main/encoding/encoding_dsv32.py)
  - [OpenHands Tool System Architecture](https://docs.openhands.dev/sdk/arch/tool-system)
  - [OpenHands Agent Dispatch Source](https://github.com/OpenHands/software-agent-sdk/blob/main/openhands-sdk/openhands/sdk/agent/agent.py)
  - [OpenHands ToolDefinition Source](https://github.com/OpenHands/software-agent-sdk/blob/main/openhands-sdk/openhands/sdk/tool/tool.py)
  - [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core.html)
  - [JSON Schema 2020-12 Validation](https://json-schema.org/draft/2020-12/json-schema-validation.html)
  - [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
  - [FastAPI Generated OpenAPI](https://fastapi.tiangolo.com/tutorial/first-steps/#openapi)
  - [FastAPI Security and OpenAPI](https://fastapi.tiangolo.com/tutorial/security/)
  - [MCP 2026-07-28 Specification Release](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
  - [MCP TypeScript SDK v2 Overview](https://ts.sdk.modelcontextprotocol.io/v2/)
  - [MCP Transports Specification](https://modelcontextprotocol.io/specification/draft/basic/transports)
  - [MCP Tools Specification](https://modelcontextprotocol.io/specification/draft/server/tools)
  - [FastMCP OpenAPI Integration](https://gofastmcp.com/integrations/openapi)
  - [FastMCP Token Verification](https://gofastmcp.com/servers/auth/token-verification)
  - [FastMCP Bearer Client Authentication](https://gofastmcp.com/clients/auth/bearer)

</details>

### 2a · Tue, Sep 1 — Agent Capabilities 2: Context Management for Long-Context Agents

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Introduction and Agent Capabilities
- Slides: [Lecture 3 slides](slides/lecture-03-long-context.pdf)
- 录像: [Lecture 3 recording](https://www.youtube.com/watch?v=AiwCCvFW1uE&list=PLSN0qpDfUvTM&index=3)
- 参考资料:
  - [DistServe](https://arxiv.org/abs/2401.09670)
  - [Needle in a Haystack](https://github.com/gkamradt/LLMTest_NeedleInAHaystack)
  - [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
  - [Longformer](https://arxiv.org/abs/2004.05150)
  - [Transformers are RNNs](https://arxiv.org/abs/2006.16236)
  - [Linear Transformers Are Secretly Fast Weight Programmers](https://arxiv.org/abs/2102.11174)
  - [Gated Delta Networks](https://arxiv.org/abs/2412.06464)
  - [Kimi Linear](https://arxiv.org/abs/2510.26692)
  - [DeepSeek Sparse Attention](https://arxiv.org/abs/2512.02556)
  - [Grouped-Query Attention](https://arxiv.org/abs/2305.13245)
  - [DeepSeek-V2](https://arxiv.org/abs/2405.04434)
  - [RoFormer](https://arxiv.org/abs/2104.09864)
  - [NoPE Length Generalization](https://arxiv.org/abs/2305.19466)
  - [Position Interpolation](https://arxiv.org/abs/2306.15595)
  - [YaRN](https://arxiv.org/abs/2309.00071)
  - [Qwen3.8-Flash-Next](https://qwen.ai/blog?id=qwen3.8-flash-next)
  - [GLM-5](https://arxiv.org/abs/2602.15763)
  - [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)
  - [Kimi K3](https://arxiv.org/abs/2607.24653)
  - [Nemotron 3 Ultra](https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3-Ultra-Technical-Report.pdf)
  - [Inkling](https://thinkingmachines.ai/news/introducing-inkling/)
  - [DeepSeek V4](https://arxiv.org/abs/2606.19348)
  - [Ring Attention](https://arxiv.org/abs/2310.01889)
  - [Megatron Context Parallelism](https://docs.nvidia.com/megatron-core/developer-guide/latest/user-guide/features/context_parallel.html)
  - [Prompt Cache](https://arxiv.org/abs/2311.04934)
  - [Can I Buy Your KV Cache?](https://arxiv.org/abs/2606.13361)
  - [DeepSeek API Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
  - [Z.AI API Pricing](https://docs.z.ai/guides/overview/pricing)
  - [Kimi K3 Pricing](https://www.kimi.ai/resources/kimi-k3-pricing)
  - [OpenAI Model Pricing](https://developers.openai.com/api/docs/models/compare)
  - [Anthropic Prompt Caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
  - [PagedAttention / vLLM](https://arxiv.org/abs/2309.06180)
  - [SGLang / RadixAttention](https://arxiv.org/abs/2312.07104)
  - [SGLang Cache-Aware Load Balancing](https://lmsys.org/blog/2024-12-04-sglang-v0-4/)
  - [MemGPT](https://arxiv.org/abs/2310.08560)
  - [LongLLMLingua](https://aclanthology.org/2024.acl-long.91/)
  - [Codex](https://github.com/openai/codex)
  - [OpenCode](https://github.com/anomalyco/opencode)
  - [Pi](https://github.com/badlogic/pi-mono)
  - [Hermes Agent](https://github.com/NousResearch/hermes-agent)
  - [OpenHands](https://github.com/All-Hands-AI/OpenHands)
  - [ReSum](https://arxiv.org/abs/2509.13313)

</details>

### 2b · Thu, Sep 3 — Agent Capabilities 3: Skills and Memory

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Introduction and Agent Capabilities
- Slides: [Lecture 4 slides](slides/lecture-04-memory-and-skills.pdf)
- 录像: [Lecture 4 recording](https://www.youtube.com/watch?v=6zigF2a-2Pw&list=PLSN0qpDfUvTM&index=4)
- 阅读材料:
  - [OpenHands: How to Create Effective Agent Skills](https://www.openhands.dev/blog/20260227-creating-effective-agent-skills)
  - [SkillsBench](https://arxiv.org/abs/2602.12670)
  - [MemGPT](https://arxiv.org/abs/2310.08560)
  - [Agent Workflow Memory (AWM)](https://arxiv.org/abs/2409.07429)
  - [Agent Skill Induction (ASI)](https://arxiv.org/abs/2504.06821)
  - [ReasoningBank](https://arxiv.org/abs/2509.25140)
- 参考资料:
  - [Mem0](https://arxiv.org/abs/2504.19413)
  - [Reflexion](https://arxiv.org/abs/2303.11366)
  - [ExpeL](https://arxiv.org/abs/2308.10144)
  - [Agent S](https://arxiv.org/abs/2410.08164)
  - [Synapse](https://arxiv.org/abs/2306.07863)
  - [ICAL](https://arxiv.org/abs/2406.14596)
  - [Voyager](https://arxiv.org/abs/2305.16291)
  - [DreamCoder](https://arxiv.org/abs/2006.08381)
  - [Stitch](https://arxiv.org/abs/2211.16605)
  - [LAPS](https://arxiv.org/abs/2106.11053)
  - [LILO](https://arxiv.org/abs/2310.19791)
  - [SkillWeaver](https://arxiv.org/abs/2504.07079)
  - [PolySkill](https://arxiv.org/abs/2510.15863)
  - [TroVE](https://arxiv.org/abs/2401.12869)
  - [Not All Skills Help](https://arxiv.org/abs/2606.15390)
  - [SAGE](https://aclanthology.org/2026.acl-long.69/)
  - [AgeMem](https://aclanthology.org/2026.acl-long.981/)
  - [HermesAgent: prompt_builder.py](https://github.com/NousResearch/hermes-agent/blob/main/agent/prompt_builder.py)
  - [HermesAgent: skills_tool.py](https://github.com/NousResearch/hermes-agent/blob/main/tools/skills_tool.py)

</details>

### 3a · Tue, Sep 8 — Agent Capabilities 4: Planning, Task Decomposition, and Multi-Agent Coordination

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Introduction and Agent Capabilities
- Slides: [Lecture 5 slides](slides/lecture-05-planning.pdf)
- 录像: [Lecture 5 recording](https://www.youtube.com/watch?v=S8v-dR4s29M&list=PLSN0qpDfUvTM&index=5)
- 阅读材料:
  - [Cursor: Introducing Plan Mode](https://cursor.com/blog/plan-mode)
  - [Least-to-Most Prompting](https://arxiv.org/abs/2205.10625)
  - [Decomposed Prompting](https://arxiv.org/abs/2210.02406)
  - [Code as Policies](https://arxiv.org/abs/2209.07753)
  - [SayCan](https://arxiv.org/abs/2204.01691)
  - [Plan-and-Act](https://arxiv.org/abs/2503.09572)
  - [Thinking vs. Doing](https://arxiv.org/abs/2506.07976)
  - [Calibrate-Then-Act](https://arxiv.org/abs/2602.16699)
  - [Recursive Agent Optimization (RAO)](https://arxiv.org/abs/2605.06639)
  - [Multi-Agent Computer Use (MACU)](https://arxiv.org/abs/2606.01533)
- 参考资料:
  - [Claude Code Permission Modes](https://code.claude.com/docs/en/cli-usage)
  - [OpenAI Model Guidance](https://developers.openai.com/api/docs/guides/latest-model)
  - [Large Language Models are Zero-Shot Reasoners](https://arxiv.org/abs/2205.11916)
  - [Plan-and-Solve Prompting](https://arxiv.org/abs/2305.04091)
  - [STaR](https://arxiv.org/abs/2203.14465)
  - [DeepSeek-R1](https://arxiv.org/abs/2501.12948)
  - [Recursive Language Models](https://arxiv.org/abs/2512.24601)
  - [PlanBench](https://arxiv.org/abs/2206.10498)
  - [ProgPrompt](https://arxiv.org/abs/2209.11302)
  - [Binder](https://arxiv.org/abs/2210.02875)
  - [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
  - [UGround](https://arxiv.org/abs/2410.05243)
  - [Agent S](https://arxiv.org/abs/2410.08164)
  - [Language Models as Zero-Shot Planners](https://arxiv.org/abs/2201.07207)
  - [LLM-Planner](https://arxiv.org/abs/2212.04088)
  - [Inner Monologue](https://arxiv.org/abs/2207.05608)
  - [SwiftSage](https://arxiv.org/abs/2305.17390)
  - [The Danger of Overthinking](https://arxiv.org/abs/2502.08235)
  - [Training Proactive and Personalized LLM Agents (PPP-Agent)](https://arxiv.org/abs/2511.02208)
  - [Vending-Bench](https://arxiv.org/abs/2502.15840)
  - [The Illusion of Diminishing Returns](https://arxiv.org/abs/2509.09677)
  - [ADaPT](https://arxiv.org/abs/2311.05772)
  - [Web Agents Should Adopt the Plan-Then-Execute Paradigm](https://arxiv.org/abs/2605.14290)
  - [TravelPlanner](https://arxiv.org/abs/2402.01622)
  - [Odysseys](https://odysseys-website.pages.dev/)
  - [Don't Sleep on Single-Agent Systems](https://www.openhands.dev/blog/dont-sleep-on-single-agent-systems)

</details>

### 3b · Thu, Sep 10 — Domains 1: Coding Agents

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Domains
- Slides: [Lecture 6 slides](slides/lecture-06-coding-agents.pdf)
- 录像: [Lecture 6 recording](https://www.youtube.com/watch?v=1BWeH1oOM7k&list=PLSN0qpDfUvTM&index=6)
- 笔记: [Coding Agents 详细讲义](docs/notes/lecture-06-coding-agents.md)
- **Assignment 1 due Mon, Sep 14: Harness**
- 参考资料:
  - [OLMo](https://arxiv.org/abs/2402.00838)
  - [StarCoder](https://arxiv.org/abs/2305.06161)
  - [Whitespace-run tokens](https://arxiv.org/abs/2107.03374)
  - [StarCoder2 tokenizer](https://huggingface.co/bigcode/starcoder2-3b/blob/main/tokenizer.json)
  - [Code Llama](https://arxiv.org/abs/2308.12950)
  - [Qwen2.5-Coder](https://arxiv.org/abs/2409.12186)
  - [InCoder](https://arxiv.org/abs/2204.05999)
  - [Scaling study](https://arxiv.org/abs/2207.14255)
  - [OctoPack](https://arxiv.org/abs/2308.07124)
  - [DrRepair](https://proceedings.mlr.press/v119/yasunaga20a.html)
  - [CodeRL](https://arxiv.org/abs/2207.01780)
  - [CodeExecutor](https://aclanthology.org/2023.findings-acl.308/)
  - [Grammar-based code generation](https://aclanthology.org/P17-1041/)
  - [CodeBLEU](https://arxiv.org/abs/2009.10297)
  - [CodeBERTScore](https://aclanthology.org/2023.emnlp-main.859/)
  - [EvalPlus](https://arxiv.org/abs/2305.01210)
  - [CodeContests / AlphaCode](https://arxiv.org/abs/2203.07814)
  - [NoFunEval](https://arxiv.org/abs/2401.15963)
  - [DeepCoder](https://www.together.ai/blog/deepcoder)
  - [SWE-agent](https://arxiv.org/abs/2405.15793)
  - [Agentless](https://arxiv.org/abs/2407.01489)
  - [mini-SWE-agent](https://mini-swe-agent.com/latest/)
  - [Aider edit formats](https://aider.chat/docs/more/edit-formats.html)
  - [Aider unified diffs](https://aider.chat/docs/unified-diffs.html)
  - [LocAgent](https://arxiv.org/abs/2503.09089)
  - [SWE-bench](https://arxiv.org/abs/2310.06770)
  - [SWE-Gym](https://arxiv.org/abs/2412.21139)
  - [R2E-Gym](https://arxiv.org/abs/2504.07164)
  - [SWE-smith](https://arxiv.org/abs/2504.21798)
  - [Multi-SWE-bench](https://arxiv.org/abs/2504.02605)
  - [SWE-bench Multilingual](https://www.swebench.com/multilingual.html)
  - [SWE-bench Multimodal](https://arxiv.org/abs/2410.03859)
  - [VisualWebArena](https://arxiv.org/abs/2401.13649)
  - [Playwright locators](https://playwright.dev/docs/locators)
  - [Commit0](https://arxiv.org/abs/2412.01769)
  - [ProgramBench](https://arxiv.org/abs/2605.03546)
  - [SWE-Milestone](https://arxiv.org/abs/2603.13428)
  - [SWT-Bench](https://arxiv.org/abs/2406.12952)
  - [SWE-Playground](https://arxiv.org/abs/2512.12216)
  - [Hybrid-Gym](https://arxiv.org/abs/2602.16819)
  - [Code World Models](https://arxiv.org/abs/2405.15383)

</details>

### 4a · Tue, Sep 15 — Computer Use Agents

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Domains
- 讲师: [JY Koh](https://jykoh.com/)
- Slides: [Lecture 7 slides](slides/lecture-07-computer-use-agents.pdf)
- 录像: [Lecture 7 recording](https://www.youtube.com/watch?v=jwGluLrrqjQ&list=PLSN0qpDfUvTM&index=7)
- 阅读材料:
  - [WebArena](https://arxiv.org/abs/2307.13854)
  - [VisualWebArena](https://arxiv.org/abs/2401.13649)
  - [OSWorld](https://arxiv.org/abs/2404.07972)
  - [OpenCUA](https://arxiv.org/abs/2508.09123)
  - [CUA-Gym](https://arxiv.org/abs/2605.25624)
  - [Multi-Agent Computer Use (MACU)](https://arxiv.org/abs/2606.01533)
- 参考资料:
  - [MiniWoB](https://arxiv.org/abs/1704.04368)
  - [WebShop](https://arxiv.org/abs/2207.01206)
  - [ReAct](https://arxiv.org/abs/2210.03629)
  - [Mind2Web](https://arxiv.org/abs/2306.06070)
  - [WebVoyager](https://arxiv.org/abs/2401.13919)
  - [ScreenSpot-Pro](https://arxiv.org/abs/2504.07981)
  - [Gym-Anything](https://arxiv.org/abs/2604.06126)
  - [MolmoWeb](https://arxiv.org/abs/2604.08516)

</details>

### 4b · Thu, Sep 17 — Training 1: Supervised Fine-Tuning (SFT)

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Training Methods
- 讲师: [Yueqi Song](https://yueqis.github.io/)
- Slides: [Lecture 8 slides](slides/lecture-08-sft.pdf)
- 录像: [Lecture 8 recording](https://www.youtube.com/watch?v=O3HSU0AoILc&list=PLSN0qpDfUvTM&index=8)
- 参考资料:
  - [Kimi K3](https://arxiv.org/abs/2607.24653)
  - [DeepSeek-R1](https://arxiv.org/abs/2501.12948)
  - [Nemotron 3 Ultra](https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3-Ultra-Technical-Report.pdf)
  - [MAI-Thinking-1](https://microsoft.ai/pdf/mai-thinking-1.pdf)
  - [K2 Horizon model card](https://huggingface.co/IFM/K2-Horizon-375B-A23B)
  - [Kimi K2](https://arxiv.org/abs/2507.20534)
  - [OpenThoughts-Agent](https://arxiv.org/abs/2606.24855)
  - [SWE-Gym](https://arxiv.org/abs/2412.21139)
  - [Agent Data Protocol](https://arxiv.org/abs/2510.24702)
  - [BalanceSFT](https://arxiv.org/abs/2505.20192)
  - [Instruction Modelling](https://arxiv.org/abs/2405.14394)
  - [Weighted Instruction Tuning](https://arxiv.org/abs/2507.07817)
  - [DAgger](https://proceedings.mlr.press/v15/ross11a.html)
  - [Transformers: chat templates](https://huggingface.co/docs/transformers/en/chat_templating)
  - [Transformers: apply_chat_template](https://huggingface.co/docs/transformers/en/main_classes/tokenizer)
  - [TRL: SFTTrainer](https://huggingface.co/docs/trl/en/sft_trainer)
  - [TRL: training chat templates](https://huggingface.co/docs/trl/en/chat_templates)
  - [Axolotl: conversation datasets](https://docs.axolotl.ai/docs/dataset-formats/conversation.html)
  - [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory)

</details>

### 5a · Tue, Sep 22 — Training 2: Reinforcement Learning Basics

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Training Methods
- Slides: [Lecture 9 slides](slides/lecture-09-rl-basics.pdf)
- 录像: [Lecture 9 recording](https://www.youtube.com/watch?v=paAcPaaYZGM&list=PLSN0qpDfUvTM&index=9)
- 阅读材料:
  - [ReST](https://arxiv.org/abs/2308.08998)
  - [ReST-EM](https://arxiv.org/abs/2312.06585)
  - [DeepSeekMath](https://arxiv.org/abs/2402.03300)
  - [DrGRPO](https://arxiv.org/abs/2503.20783)
- 参考资料:
  - [RL Fundamentals](https://cmu-l3.github.io/anlp-spring2026/static_files/anlp-s2026-16-rl.pdf)
  - [REINFORCE](https://doi.org/10.1007/BF00992696)

</details>

### 5b · Thu, Sep 24 — Domains 3: Deep Research Agents

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Domains
- 讲师: [Akari Asai](https://akariasai.github.io/)
- Slides: [Lecture 10 slides](slides/lecture-10-deep-research-agents.pdf)
- 阅读材料:
  - [OpenScholar](https://www.nature.com/articles/s41586-025-10072-4)
  - [BrowseComp](https://arxiv.org/abs/2504.12516)
  - [DeepResearch Bench](https://arxiv.org/abs/2506.11763)
  - [Tongyi DeepResearch](https://arxiv.org/abs/2510.24701)
  - [DR Tulu](https://arxiv.org/abs/2511.19399)
  - [AgentIR](https://arxiv.org/abs/2603.04384)
- 参考资料:
  - [Natural Questions example](https://ai.google.com/research/NaturalQuestions/databrowser)
  - [Wikipedia source document](https://en.wikipedia.org/w/index.php?oldid=824425456)
  - [BrowseComp-Plus](https://arxiv.org/abs/2508.06600)
  - [FinSearchComp](https://arxiv.org/abs/2509.13160)
  - [MedBrowseComp](https://arxiv.org/abs/2505.14963)
  - [ScholarSearch](https://arxiv.org/abs/2506.13784)
  - [AutoResearchBench](https://arxiv.org/abs/2604.25256)
  - [A Critical Evaluation of Evaluations for Long-form Question Answering](https://aclanthology.org/2023.acl-long.181/)
  - [ResearchQA](https://arxiv.org/abs/2509.00496)
  - [DeepResearch Bench II](https://arxiv.org/abs/2601.08536)
  - [CMU Archives: Herbert Simon](https://digitalcollections.library.cmu.edu/cmu-collection/herbert-simon)
  - [1978 Nobel Prize in Economic Sciences](https://www.nobelprize.org/prizes/economic-sciences/1978/summary/)
  - [WebSailor-V2](https://arxiv.org/abs/2509.13305)
  - [WebDancer](https://arxiv.org/abs/2505.22648)
  - [Scaling Agents via Continual Pre-training](https://arxiv.org/abs/2509.13310)
  - [Search-R1](https://arxiv.org/abs/2503.09516)
  - [DeepSeekMath](https://arxiv.org/abs/2402.03300)
  - [Dense Passage Retrieval](https://aclanthology.org/2020.emnlp-main.550/)

</details>

### 6a · Tue, Sep 29 — Training 3: Advanced RL Algorithms

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Training Methods
- Slides: [Lecture 11 slides](slides/lecture-11-rl-advanced.pdf)
- 参考资料:
  - [MIXER](https://michaelauli.github.io/papers/iclr2016_mixer.pdf)
  - [InstructGPT](https://arxiv.org/abs/2203.02155)
  - [Generalized Advantage Estimation (GAE)](https://arxiv.org/abs/1506.02438)
  - [Let’s Verify Step by Step](https://arxiv.org/abs/2305.20050)
  - [AReaL](https://arxiv.org/abs/2505.24298)
  - [CTPO](https://arxiv.org/abs/2605.07331)
  - [Proximal Policy Optimization (PPO)](https://arxiv.org/abs/1707.06347)
  - [DeepSeekMath (GRPO)](https://arxiv.org/abs/2402.03300)
  - [MiniMax-M1 (CISPO)](https://arxiv.org/abs/2506.13585)
  - [Group Sequence Policy Optimization (GSPO)](https://arxiv.org/abs/2507.18071)
  - [DAPO](https://arxiv.org/abs/2503.14476)
  - [Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/)
  - [Why we no longer evaluate SWE-bench Verified](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)
  - [SABER (τ-bench audit)](https://arxiv.org/abs/2512.07850)
  - [τ-bench task fixes](https://taubench.com/blog/tau3-task-fixes.html)
  - [Reward Hacking in Reinforcement Learning](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/)
  - [MAI-Thinking-1](https://microsoft.ai/pdf/mai-thinking-1.pdf)
  - [PostTrainBench](https://arxiv.org/abs/2603.08640)
  - [Curriculum Learning](https://doi.org/10.1145/1553374.1553380)
  - [OpenAI: calculator hacking and production evaluations](https://alignment.openai.com/prod-evals/)
  - [Where the goblins came from](https://openai.com/index/where-the-goblins-came-from/)
  - [Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531)
  - [On-Policy Distillation of Language Models (GKD)](https://arxiv.org/abs/2306.13649)
  - [Self-Distilled Reasoner (OPSD)](https://arxiv.org/abs/2601.18734)
  - [Policy Invariance Under Reward Transformations](https://people.eecs.berkeley.edu/~russell/papers/icml99-shaping.pdf)

</details>

### 6b · Thu, Oct 1 — Training 4: RL Systems

- 模块: Training Methods
- 讲师: [Apurva Gandhi](https://apga.github.io/)
- Slides: [Lecture 12 slides](slides/lecture-12-rl-systems.pdf)
- **Assignment 2 due: Eval**

### 7a · Tue, Oct 6 — Safety 1: Agent Safety

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Agent Safety
- Slides: [Lecture 13 slides](slides/lecture-13-agent-safety.pdf)
- 参考资料:
  - [OpenClaw incident report](https://x.com/summeryue0/status/2025774069124399363)
  - [PocketOS database-deletion incident](https://thenewstack.io/ai-agents-credential-crisis)
  - [Microsoft advisory: CVE-2025-32711](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-32711)
  - [Cline supply-chain compromise postmortem](https://cline.bot/blog/post-mortem-unauthorized-cline-cli-npm)
  - [Gambit Security: AI agents targeting online retailers](https://gambit.security/blog-posts/autonomous-ai-agents-online-retailers-25-a-company)
  - [AgentDojo](https://arxiv.org/abs/2406.13352v3)
  - [ToolEmu](https://arxiv.org/abs/2309.15817v2)
  - [Introducing Docent](https://transluce.org/docent/blog/introducing-docent)
  - [Gray Swan Arena: Agent Red-Teaming Challenge](https://app.grayswan.ai/arena/challenge/agent-red-teaming/leaderboard)
  - [Security Challenges in AI Agent Deployment: Insights from a Large Scale Public Competition](https://arxiv.org/abs/2507.20526)
  - [Jailbreaking Black Box Large Language Models in Twenty Queries (PAIR)](https://arxiv.org/abs/2310.08419)
  - [Nemotron 3 Super technical report](https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3-Super-Technical-Report.pdf)
  - [Docker Engine security](https://docs.docker.com/engine/security/)
  - [Modal sandbox networking and security](https://modal.com/docs/guide/sandbox-networking)
  - [OpenShell architecture (pinned revision)](https://github.com/NVIDIA/OpenShell/blob/ec49209da25be39840742df29b64ec694d159c2f/docs/about/architecture.mdx)
  - [Modal sandboxes](https://modal.com/docs/guide/sandboxes)
  - [E2B sandbox persistence](https://docs.e2b.dev/sandbox/persistence)
  - [Apptainer quick start](https://apptainer.org/docs/user/main/quick_start.html)
  - [QEMU system emulation](https://www.qemu.org/docs/master/system/introduction.html)
  - [E2B sandbox lifecycle](https://docs.e2b.dev/sandbox)
  - [GitHub personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
  - [RFC 8693: OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html)
  - [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
  - [AI Control: Improving Safety Despite Intentional Subversion](https://arxiv.org/abs/2312.06942v5)
  - [OpenTelemetry generative AI attributes](https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/)
  - [Docent](https://transluce.org/docent)
  - [Monitoring Reasoning Models for Misbehavior and the Risks of Promoting Obfuscation](https://arxiv.org/abs/2503.11926)
  - [AgentHarm](https://arxiv.org/abs/2410.09024)
  - [OpenAgentSafety](https://arxiv.org/abs/2507.06134v2)
  - [Monitoring Monitorability](https://arxiv.org/abs/2512.18311)

</details>

### 7b · Thu, Oct 8 — Frameworks 1: OpenHands

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Agent Frameworks
- 讲师: [Graham Neubig](https://www.phontron.com/)
- Slides: [Lecture 14 slides](slides/lecture-14-openhands.pdf)
- 参考资料:
  - [OpenHands Software Agent SDK report](https://arxiv.org/abs/2511.03690v1)
  - [OpenHands SDK source and examples](https://github.com/OpenHands/software-agent-sdk/tree/69e26889401fe69157fff536e6a69049e6644cb3)
  - [OpenHands](https://github.com/OpenHands/OpenHands)
  - [HumanEval](https://arxiv.org/abs/2107.03374)
  - [SWE-bench](https://arxiv.org/abs/2310.06770v1)
  - [Devin launch demo](https://www.youtube.com/watch?v=fjHtjT7GO1c)
  - [OpenDevin: original callout](https://x.com/JustinLin610/status/1767769034186211557)
  - [OpenDevin: early frontend demo](https://x.com/gneubig/status/1772735837479792761)
  - [SWE-agent](https://arxiv.org/abs/2405.15793)
  - [OpenDevin CodeAct 1.0](https://xwang.dev/blog/2024/opendevin-codeact-1.0-swebench/)
  - [Don't Sleep on Single-agent Systems](https://hub.openhands.dev/blog/dont-sleep-on-single-agent-systems)
  - [CodeR](https://arxiv.org/abs/2406.01304)
  - [MetaGPT](https://arxiv.org/abs/2308.00352)
  - [OpenHands-Versa](https://arxiv.org/abs/2506.03011v1)
  - [Code with Me or for Me?](https://arxiv.org/abs/2507.08149v1)
  - [VS Code with Copilot: agent quickstart](https://code.visualstudio.com/docs/agents/quickstart)
  - [Claude Code terminal demo](https://github.com/anthropics/claude-code/blob/71cdddec623889d38af14b7a489670a03186f659/demo.gif)
  - [GitHub Copilot coding agent](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/)
  - [OpenHands software-factory example](https://github.com/OpenHands/docs/pull/797)
  - [SkillRefiner: offline skill refinement](https://www.alphaxiv.org/abs/2610.skillrefiner-offline-skill-refinement)

</details>

### 8a · Tue, Oct 13 — Fall Break - No class

### 8b · Thu, Oct 15 — Fall Break - No class

### 9a · Tue, Oct 20 — Frameworks 2: Orchestration and Monitoring

<details>
<summary>展开 Slides / 录像 / 阅读材料</summary>

- 模块: Agent Frameworks
- Slides: [Lecture 15 slides](slides/lecture-15-orchestration-and-monitoring.pdf)
- 阅读材料:
  - [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
  - [Thinking in LangGraph](https://docs.langchain.com/oss/python/langgraph/thinking-in-langgraph)
  - [Diagnosing a performance regression on Terminal-Bench with Docent](https://transluce.org/docent/blog/terminal-bench)
  - [Hodoscope: Unsupervised Monitoring for AI Misbehaviors](https://arxiv.org/abs/2604.11072)
- 参考资料:
  - [LangGraph: Workflows and agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents)
  - [LangGraph: Persistence](https://docs.langchain.com/oss/python/langgraph/persistence)
  - [LangGraph: Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
  - [LangGraph: Testing](https://docs.langchain.com/oss/python/langgraph/test)
  - [LangChain: Testing](https://docs.langchain.com/oss/python/langchain/test)
  - [LangSmith: Evaluation](https://docs.langchain.com/langsmith/evaluation)
  - [Course support demo: password-reset trace](https://smith.langchain.com/public/5e17b93a-17af-4386-ada0-9bd033f98a74/r)
  - [Course support demo: billing trace before approval](https://smith.langchain.com/public/aeddf201-687b-4389-acdb-137dd9683000/r)
  - [Course support demo: billing trace after approval](https://smith.langchain.com/public/416d3c74-4b43-4883-b189-92a57431a819/r)
  - [Docent: Pairwise comparisons and failure-mode synthesis](https://docent.transluce.org/dashboard/9bafeb94-3f6e-4d03-bd01-1ae8476e3f6e/analysis-plan/81230a32-88e0-42af-82c9-101660ab1d89)
  - [Docent: No-timeout task comparison](https://docent.transluce.org/dashboard/9bafeb94-3f6e-4d03-bd01-1ae8476e3f6e/analysis-plan/772c0920-0b0f-4355-a009-825d1dd553b4)
  - [Hodoscope announcement](https://hodoscope.dev/blog/announcement.html)
  - [Embedding Atlas](https://apple.github.io/embedding-atlas/)
  - [OpenHands SDK](https://docs.openhands.dev/sdk)
  - [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview)
  - [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)
  - [AG2 overview](https://docs.ag2.ai/latest/docs/user-guide/basic-concepts/overview/)
  - [DSPy](https://dspy.ai/)
  - [Don’t Sleep on Single-Agent Systems](https://hub.openhands.dev/blog/dont-sleep-on-single-agent-systems)
  - [Agent Skills specification](https://agentskills.io/specification)
  - [Multi-Agent Computer Use (MACU)](https://arxiv.org/abs/2606.01533)
  - [OpenHands automations: Fujitsu talk slides](https://github.com/neubig/slides/tree/main/slides/2026-09-25-fujitsu-openhands-en)
  - [Black Hat USA 2026: The OpenAI–Hugging Face incident](https://www.youtube.com/watch?v=87DyyMV0kCY)
  - [OpenAI: Hugging Face incident and the road ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/)

</details>

### 9b · Thu, Oct 22 — Safety 2: Observability and Monitoring

- 模块: Frameworks and Safety
- 讲师: [Eric Wallace](https://www.ericswallace.com/)

### 10a · Tue, Oct 27 — Agents and the Future of Work

- 模块: Interaction and Projects
- 讲师: [Zora Wang](https://zorazrw.github.io/)

### 10b · Thu, Oct 29 — Interaction 1: Multi-Agent Interaction

- 模块: Interaction and Projects
- 讲师: [Saujas Vaduguru](https://saujasv.github.io/)
- **Assignment 3 due: Training**

### 11a · Tue, Nov 3 — Project hours

### 11b · Thu, Nov 5 — Project hours

### 12a · Tue, Nov 10 — Interaction 2: Human-Agent Interaction

- 模块: Interaction and Projects
- 讲师: [Valerie Chen](https://valeriechen.github.io/)

### 12b · Thu, Nov 12 — Search 1: Reranking and Critic Models

- 模块: Search and Inference

### 13a · Tue, Nov 17 — Search 2: Tree Search

- 模块: Search and Inference
- 讲师: [JY Koh](https://jykoh.com/)

### 13b · Thu, Nov 19 — Guest Lecture

- 模块: Advanced Topics
- 讲师: [Karthik Narasimhan](https://www.cs.princeton.edu/~karthikn/)

### 14a · Tue, Nov 24 — Guest Lecture

- 模块: Advanced Topics
- 讲师: [Sasha Rush](https://srush.github.io/)

### 14b · Thu, Nov 26 — Thanksgiving - No class

### 15a · Tue, Dec 1 — Final presentations (posters)

### 15b · Thu, Dec 3 — Final presentations (posters)

