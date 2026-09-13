# 卡内基梅隆大学 11-768 · AI Agents (Fall 2026)

来源: [cmu-agents.com](https://www.cmu-agents.com) · Slides 已下载至 `slides/`

## 课程安排

### 1a · Tue, Aug 25 — Course Overview: What Is an Agent?

- 模块: Introduction and Agent Capabilities
- Slides: [Lecture 1 slides](slides/lecture-01-agents.pdf)
- 录像: [Lecture 1 recording](https://www.youtube.com/watch?v=UwfjzyLnvMg&list=PLSN0qpDfUvTM&index=1)
- 阅读材料:
  - [Toolformer](https://arxiv.org/abs/2302.04761)
  - [ReAct](https://arxiv.org/abs/2210.03629)
  - [Mini-SWE-Agent](https://github.com/swe-agent/mini-swe-agent)

### 1b · Thu, Aug 27 — Agent Capabilities 1: Tool Use

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

### 2a · Tue, Sep 1 — Agent Capabilities 2: Context Management for Long-Context Agents

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

### 2b · Thu, Sep 3 — Agent Capabilities 3: Skills and Memory

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

### 3a · Tue, Sep 8 — Agent Capabilities 4: Planning, Task Decomposition, and Multi-Agent Coordination

- 模块: Introduction and Agent Capabilities
- Slides: [Lecture 5 slides](slides/lecture-05-planning.pdf)
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

### 3b · Thu, Sep 10 — Domains 1: Coding Agents

- 模块: Domains
- Slides: [Lecture 6 slides](slides/lecture-06-coding-agents.pdf)
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

### 4a · Tue, Sep 15 — Domains 2: GUI Agents

- 模块: Domains
- 讲师: [JY Koh](https://jykoh.com/)

### 4b · Thu, Sep 17 — Training 1: Supervised Fine-Tuning (SFT)

- 模块: Training Methods
- 讲师: [Yueqi Song](https://yueqis.github.io/)

### 5a · Tue, Sep 22 — Training 2: Reinforcement Learning Basics

- 模块: Training Methods

### 5b · Thu, Sep 24 — Domains 3: Deep Research Agents

- 模块: Domains
- 讲师: [Akari Asai](https://akariasai.github.io/)
- **Assignment 2 due: Eval**

### 6a · Tue, Sep 29 — Training 3: Advanced RL Algorithms

- 模块: Training Methods

### 6b · Thu, Oct 1 — Training 4: RL Systems

- 模块: Training Methods
- 讲师: [Apurva Gandhi](https://apga.github.io/)

### 7a · Tue, Oct 6 — Safety 1: Sandboxing and Credential Management

- 模块: Agent Safety

### 7b · Thu, Oct 8 — Frameworks 1: OpenHands

- 模块: Agent Frameworks

### 8a · Tue, Oct 13 — Fall Break - No class

### 8b · Thu, Oct 15 — Fall Break - No class

### 9a · Tue, Oct 20 — Frameworks 2: LangGraph

- 模块: Agent Frameworks

### 9b · Thu, Oct 22 — Safety 2: Observability and Monitoring

- 模块: Frameworks and Safety
- 讲师: [Eric Wallace](https://www.ericswallace.com/)
- **Assignment 3 due: Training**

### 10a · Tue, Oct 27 — Agents and the Future of Work

- 模块: Interaction and Projects
- 讲师: [Zora Wang](https://zorazrw.github.io/)

### 10b · Thu, Oct 29 — Interaction 1: Multi-Agent Interaction

- 模块: Interaction and Projects
- 讲师: [Saujas Vaduguru](https://saujasv.github.io/)

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
