# Lify

## 项目概述

**定位**：面向团队内部（20–50 人）的轻量级 AI Agent 平台，本地部署，单人可维护。

Dify 的核心能力中，只取其 Agent 执行引擎 + RAG + 对话交互，砍掉多租户、可视化工作流编辑器、插件市场、企业级运维等"平台化"包装。

### 做什么

- 定义 Agent（系统提示词 + 模型 + 工具 + 知识库绑定），一个 YAML 文件就是一个 Agent
- 接入 LLM（OpenAI 兼容 API、Ollama 本地模型），统一管理 API Key
- 单页面 Chat UI，流式输出，多轮对话，展示 Agent 思考链
- 文档上传 → 切片 → 向量化 → 对话时自动检索注入上下文（RAG）
- Agent 执行引擎：接收消息 → 检索知识 → 调用工具 → LLM 生成 → 流式返回
- 基础的用量日志（token 消耗记录）和运行日志

### 不做什么

- 不做可视化拖拽工作流编辑器 → 改用 YAML 定义 Step 序列
- 不做多应用类型（聊天助手/文本生成/工作流）→ 统一为 Agent 一个概念
- 不做插件市场 / MCP 协议 / Skills 扩展框架 → 工具直接在代码中集成
- 不做多租户、RBAC、SSO → 单空间，团队共用
- 不做混合检索（BM25 + Rerank）→ 纯向量检索
- 不做高可用、K8s 编排、灾备 → 单机 Docker Compose 部署
- 不做可视化 Prompt 设计器、应用模板市场、用户反馈系统

### 技术栈

| 层 | 选型 |
|---|---|
| 后端 | Spring Boot 3.x + Java 17+ |
| 前端 | Vue 3 + TypeScript |
| AI 编排 | LangChain4j（模型调用 / 工具调用 / RAG 链路） |
| 向量库 | ChromaDB（嵌入式模式，零运维） |
| 数据库 | PostgreSQL（业务数据） + pgvector（备选向量方案） |
| 部署 | Docker Compose，单机 |

### 参考

- Dify 官方：https://dify.ai
- Dify 源码：https://github.com/langgenius/dify
- 产品功能取舍讨论见 `gn.md`
