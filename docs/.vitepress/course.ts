export interface Lecture {
  code: string
  slug: string
  sidebar: string
  topic: string
  title: string
  oneLiner: string
  video: boolean
  minutes: number
}

export interface CourseModule {
  id: string
  title: string
  lectures: Lecture[]
}

export const courseModules: CourseModule[] = [
  {
    id: 'intro',
    title: '导论与 Agent 能力',
    lectures: [
      {
        code: '1a',
        slug: 'lecture-01-agents',
        sidebar: '1a · 课程概览',
        topic: 'Course Overview: What Is an Agent?',
        title: '课程概览：什么是 Agent？',
        oneLiner: 'Agent = 模型在循环里；能力上限由模型、harness、环境与评测共同决定。',
        video: true,
        minutes: 5
      },
      {
        code: '1b',
        slug: 'lecture-02-tool-use',
        sidebar: '1b · Tool Use',
        topic: 'Agent Capabilities 1: Tool Use',
        title: 'Tool Use：把语言变成动作',
        oneLiner: '模型只提议调用，harness 负责执行；工具调用在实现上就是 token。',
        video: true,
        minutes: 5
      },
      {
        code: '2a',
        slug: 'lecture-03-long-context',
        sidebar: '2a · 长上下文 Agent',
        topic: 'Context Management for Long-Context Agents',
        title: '长上下文：容量与成本',
        oneLiner: '上下文成本随轮数二次增长；容量与效率要分开优化，缓存和压缩各管一半。',
        video: true,
        minutes: 5
      },
      {
        code: '2b',
        slug: 'lecture-04-memory-and-skills',
        sidebar: '2b · Skills & Memory',
        topic: 'Skills and Memory',
        title: 'Skills & Memory：不从头开始',
        oneLiner: '不把经验写进权重，也能让 agent 变强；skill 与 memory 是可检查的外部工件。',
        video: true,
        minutes: 5
      },
      {
        code: '3a',
        slug: 'lecture-05-planning',
        sidebar: '3a · Planning 与多 Agent',
        topic: 'Planning, Task Decomposition, and Multi-Agent Coordination',
        title: 'Planning 与多 Agent',
        oneLiner: '计划是对未来行为的显式表示；多 agent 的收益来自更好的分解与重规划。',
        video: true,
        minutes: 5
      }
    ]
  },
  {
    id: 'domains',
    title: '应用领域',
    lectures: [
      {
        code: '3b',
        slug: 'lecture-06-coding-agents',
        sidebar: '3b · Coding Agent',
        topic: 'Coding Agents',
        title: 'Coding Agent',
        oneLiner: '核心循环是 localize → edit → verify；评测靠执行，工具设计直接影响成绩。',
        video: true,
        minutes: 5
      },
      {
        code: '4a',
        slug: 'lecture-07-computer-use-agents',
        sidebar: '4a · Computer Use Agent',
        topic: 'Computer Use Agents',
        title: 'Computer Use Agent',
        oneLiner: 'CUA 在人类界面上工作；动作、结果、过程三层评测不能混成一个分数。',
        video: true,
        minutes: 5
      },
      {
        code: '5b',
        slug: 'lecture-10-deep-research-agents',
        sidebar: '5b · Deep Research Agent',
        topic: 'Deep Research Agents',
        title: 'Deep Research Agent',
        oneLiner: '多轮检索与综合；长答案要用 rubric 与引用支撑来评，不能靠相似度。',
        video: true,
        minutes: 5
      }
    ]
  },
  {
    id: 'training',
    title: '训练方法',
    lectures: [
      {
        code: '4b',
        slug: 'lecture-08-sft',
        sidebar: '4b · SFT',
        topic: 'Supervised Fine-Tuning (SFT)',
        title: 'SFT：把轨迹写进权重',
        oneLiner: '模板、掩码与数据选择比超参数更关键；SFT 是 RL 的冷启动，不是终点。',
        video: true,
        minutes: 5
      },
      {
        code: '5a',
        slug: 'lecture-09-rl-basics',
        sidebar: '5a · RL 基础',
        topic: 'Reinforcement Learning Basics',
        title: 'RL 基础：从 REINFORCE 到 GRPO',
        oneLiner: 'RL 只做三件事：采样、打分、按权重更新；各算法只差一个权重 w_t。',
        video: true,
        minutes: 5
      },
      {
        code: '6a',
        slug: 'lecture-11-rl-advanced',
        sidebar: '6a · RL 高级',
        topic: 'Advanced RL Algorithms',
        title: 'RL 高级：信用、异步与奖励',
        oneLiner: 'agentic RL 的难点是信用分配、陈旧 rollout 与奖励可靠性，不是公式本身。',
        video: true,
        minutes: 5
      },
      {
        code: '6b',
        slug: 'lecture-12-rl-systems',
        sidebar: '6b · RL 系统',
        topic: 'RL Systems',
        title: 'RL 系统：两个引擎',
        oneLiner: 'RL 系统 = 推理引擎 + 训练引擎 + 两者之间的接缝；轨迹要以 token 传输。',
        video: true,
        minutes: 5
      }
    ]
  },
  {
    id: 'safety',
    title: '安全与框架',
    lectures: [
      {
        code: '7a',
        slug: 'lecture-13-agent-safety',
        sidebar: '7a · Agent 安全',
        topic: 'Agent Safety',
        title: 'Agent 安全：权限、沙箱与监控',
        oneLiner: '安全是权限与边界设计；不可逆动作必须有人工闸门，检查要发生在执行前。',
        video: true,
        minutes: 5
      },
      {
        code: '7b',
        slug: 'lecture-14-openhands',
        sidebar: '7b · OpenHands',
        topic: 'OpenHands',
        title: 'OpenHands：harness 的工程学',
        oneLiner: '产品能不能用，往往取决于工具集、上下文、隔离与界面；默认先试单 agent。',
        video: true,
        minutes: 5
      },
      {
        code: '9a',
        slug: 'lecture-15-orchestration-and-monitoring',
        sidebar: '9a · 编排与监控',
        topic: 'Orchestration and Monitoring',
        title: '编排与监控：把行为写进图',
        oneLiner: '工作流把决策写进代码；trace 与监控让“应该发生什么”变成“实际发生了什么”。',
        video: false,
        minutes: 5
      }
    ]
  }
]

export const allLectures = courseModules.flatMap((module) => module.lectures)

export const notesSidebar = courseModules.map((module) => ({
  text: module.title,
  items: module.lectures.map((lecture) => ({
    text: lecture.sidebar,
    link: `/notes/${lecture.slug}`
  }))
}))

export const essenceSidebar = [
  {
    text: '开始',
    items: [{ text: '总览 · 75 分钟路线', link: '/essence/' }]
  },
  ...courseModules.map((module) => ({
    text: module.title,
    items: module.lectures.map((lecture) => ({
      text: lecture.sidebar,
      link: `/essence/${lecture.slug}`
    }))
  }))
]
