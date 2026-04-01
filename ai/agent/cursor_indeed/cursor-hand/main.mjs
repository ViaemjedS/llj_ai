import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import {
    HumanMessage,
    SystemMessage,
    ToolMessage,
} from '@langchain/core/messages'
import {
    readFileTool,
    writeFileTool,
    executeCommandTool,
    listDirectoryTool
} from './all_tools.mjs'
import chalk from 'chalk'; // 彩色输出

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME, // 比qwen-coder-turbo 更强大
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    }
})

const tools = [
    readFileTool,
    writeFileTool,
    executeCommandTool,
    listDirectoryTool,
]


// modelWithTools
const modelWithTools = model.bindTools(tools);

// web 4.0 AI earn money
async function runAgentWithTools(query, maxIterations = 1) {
    // 检测任务完成情况
    // 不用tool
    // 在用tool llm还在自动进行中
    const messages = [
        new SystemMessage(`
            你是一个项目管理助手，使用工具完成任务，
            当前工作目录: ${process.cwd()}    
            工具:
            1. read_file: 读取文件
            2. write_file: 写入文件
            3. execute_command: 执行命令(支持workingDirectory 参数)
            4. list_directory: 列出目录

            重要规则 - execute_command:
            - workingDirectory: 参数会自动切换到指定目录
            - 当使用workingDirectory 参数时，不要在command中使用cd 命令
            - 正确示例: { command: "pnpm install", workingDirectory: "react-todo-app"}
            这样就对了！ workingDirectory 已经切换到 react-todo-app 目录下，直接执行命令即可
            回复要简洁，只说做了什么
            
        `),
        new HumanMessage(query),
    ];
    // 循环是agent的核心 llm 思考， 规划，调整， 不断迭代，直到任务完成，更加智能化
    for (let i = 0; i < maxIterations; i++) {
        console.log(chalk.bgGreen('正在等待AI思考...'));
        const response = await modelWithTools.invoke(messages);
        // messages.push(response);
        if(!response.tool_calls || response.tool_calls_length === 0) {
            console.log(`\n AI 最终回复： \n ${response.content}\n`);
            return response.content;
        }



        for (const toolCall of response.tool_calls) {
            const foundTool = tools.find(t => t.name === toolCall.name);
            if(foundTool) {
                const toolResult = await foundTool.invoke(toolCall.args);
                messages.push(new ToolMessage({
                    content: toolResult,
                    tool_call_id: toolCall.id,
                }));
            }
        }
    }
    return messages[messages.length - 1].content;
}
const case1 = `
    # React Todo List 应用开发 Todos 列表

## 📁 项目初始化
1. **执行命令**：使用 Create React App 创建项目
2. **列出目录**：查看项目结构
3. **删除文件**：移除不需要的默认文件

## 🎨 组件开发
1. **创建文件**：创建 TodoList 组件文件
2. **写入文件**：编写 TodoList 组件基础结构
3. **创建文件**：创建 TodoItem 组件文件
4. **写入文件**：编写 TodoItem 组件实现

## ⚙️ 功能实现
1. **写入文件**：实现 Todo 项的添加功能
2. **写入文件**：实现 Todo 项的删除功能
3. **写入文件**：实现 Todo 项的状态切换
4. **写入文件**：添加本地存储功能

## 🎨 样式设计
1. **写入文件**：编写组件 CSS 样式
2. **修改文件**：优化布局和交互效果

## 🧩 组件集成
1. **修改文件**：在 App.js 中集成 TodoList 组件
2. **执行命令**：启动开发服务器查看效果
你可以直接这样告诉 AI：

执行命令行操作类工具的目录位置为E:/Project/Trae/Ai_Lesson/ai/cursor_indeed/test
- "调用命令行操作类工具执行 npx create-react-app todo-list" 
- "调用文件操作类工具创建 src/components/TodoList.jsx"
- "调用文件操作类工具写入 TodoList 组件代码"
- "调用文件操作类工具创建 src/components/TodoItem.jsx"
- "调用文件操作类工具写入 TodoItem 组件代码"
- "调用命令行操作类工具执行 npm start 启动开发服务器"

`

try {
    await runAgentWithTools(case1);
} catch(error) {
    console.error(`\n 错误: ${error.message}\n`);
}