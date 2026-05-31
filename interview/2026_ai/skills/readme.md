# Skills

## MCP
Model Context Protocol 标准协议 让AI链接外部世界（工具/PromptTemplate/文档）

MCP解决的是能做什么，却无法替代人类或高级智能体所具备的复杂情景判断，创造性策略制定或领域模糊问题。

llm with tool 执行任务
mcp 将原有服务提供给llm     server nest.js  mcp sdk
sdk @tool 工具
@Prompt prompt 模板
@resource 资源


skills 技能
- 是一个文件夹  比如ppt 
    - SKILL.md 必须的 Prompt 
    技能声明
    - scripts 文件夹
    完成任务 
    - 资源
SKILLs 可复用的AI专业能力包 (Prompt + 规划 + 工具 + 资源)

类比:
Prompt 一次性对话 无状态 RAG Tool 任务
SKILLs 可复用的经验 
小龙虾安装各种SKILLS 自动化工作

- 为什么SKILLs 会火
1. 传统Prompt 的问题
帮我写一个RRD
问题:
- 每次都要重复描述
- 不稳定
- 不可复用

skills 解决什么
- 可复用 一次写好，多次使用
- 标准化，团队统一AI行为
- 可组合 多个SKILLS 组成Agent
- 低成本， 不需要开发服务器端， MCP的区别
SKILLs 是instructions + scripts + resources 的组合

MCP可以完成任务， SKILLS 将任务怎么做的更好
小龙虾 Manus 的开源版本     智能体管家  opc 的实例
智能体的windows  操作系统来了

skills + mcp = 完整 AI Agent

用户: 分析这个excel 
MCP:  读取excel
skills 可以在读取的同时， 按公司规划分析 + 输出报告

### 以brand-guidelines为例
- Gemini3 生成landing page 按照这个skill 的要求
    颜色、风格、主题、anthorpic
    公司开发skill， 有利于AI生成的统一

怎么写一个skills
- skills 的名字和文件夹一样 小写， 多个单词-连接
- SKILL.md prompt文件
    - 头部， YAML(json) 前置元数据
        ---
            name: brand-guidelines
            description: Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.
            license: Complete terms in LICENSE.txt
        --- 
- 总述它的作用

### ppt skills

- 渐进式的
    技能比较复杂，多种场景，渐进式的加载
    Skill.md 模块化加载别的md文件
    省token