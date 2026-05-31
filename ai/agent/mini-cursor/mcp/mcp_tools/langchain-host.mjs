// 跨进程的MCP Client

import 'dotenv/config'
// adapter mcp适配器
import {
    MultiServerMCPClient
} from '@langchain/mcp-adapters'
import { ChatOpenAI } from '@langchain/openai'
import {
    HumanMessage,
    ToolMessage,
} from '@langchain/core/messages'
import chalk from 'chalk'

// host
const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
    temperature: 0,
});

// client
const mcpClient = new MultiServerMCPClient({
    mcpServers: {
        'my-mcp-server': {
            "command": "node",
            "args": ["E:/Project/Trae/Ai_Lesson/ai/agent/mini-cursor/mcp/mcp_tools/my-mcp-server.mjs"],
        }
    } 
});

const tools = await mcpClient.getTools();
console.log(tools, '////');
const modelWithTools = model.bindTools(tools);
console.log(modelWithTools, '////');


async function runAgentWithTools(query, maxIteration=30) {
    const messages = [
        new HumanMessage(query)
    ];

    for (let i = 0; i < maxIteration; i++) {
        console.log(chalk.bgGreen('正在等待AI思考...'));
        const response = await modelWithTools.invoke(messages);
        console.log(response,'/////');
        messages.push(response); // assistant 

        if(!response.tool_calls  || response.tool_calls.length === 0) {
            console.log(`\n AI 最终回复: \n ${response.content} \n`)
            return response.content;
        }

        console.log(chalk.bgGreen(`检测到 ${response.tool_calls.length} 个工具调用`));
        console.log(chalk.bgBlue(`\n AI 调用工具: \n ${response.tool_calls.map(t => t.name).join(', ')}`));

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
    // console.log(chalk.bgRed(`\n AI 最终回复: \n ${messages} \n`))
    return messages[messages.length - 1].content;
}

const result = await runAgentWithTools('查询001用户信息');
console.log(result, '////');
await mcpClient.close();