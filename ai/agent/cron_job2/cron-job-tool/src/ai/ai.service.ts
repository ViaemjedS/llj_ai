import { Injectable, Inject } from '@nestjs/common';
// 可运行的对象
import { Runnable } from '@langchain/core/runnables';
import {
    type AIMessageChunk,
    AIMessage,
    HumanMessage,
    SystemMessage,
    BaseMessage,
    ToolMessage,
} from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { StructuredTool } from '@langchain/core/tools';


@Injectable()
export class AiService {
    private readonly modelWithTools: Runnable<BaseMessage[], AIMessage>;

    constructor(
        @Inject('CHAT_MODEL') model: ChatOpenAI,
        @Inject('WEB_SEARCH_TOOL') private readonly webSearchTool: StructuredTool,
        @Inject('DB_USERS_CRUD_TOOL') private readonly dbUsersCrudTool: StructuredTool,
        @Inject('SEND_MAIL_TOOL') private readonly sendMailTool: StructuredTool,
        @Inject('TIME_NOW_TOOL') private readonly timeNowTool: StructuredTool,
    ) {
        this.modelWithTools = model.bindTools([
            this.webSearchTool,
            this.dbUsersCrudTool,
            this.sendMailTool,
            this.timeNowTool,
        ]);
    }

    async *runChainStream(query: string): AsyncIterable<string> {
        const messages: BaseMessage[] = [
            new SystemMessage(`你是一个智能助手，可以在需要时调用工具（如 web_search, db_users_crud）
                来查询信息，再用结果来回答用户问题。
            `),
            new HumanMessage(query),
        ];
         while(true) {
            const stream = await this.modelWithTools.stream(messages);
            let fullAIMessage: AIMessageChunk | null = null;
            for await (const chunk of stream as AsyncIterable<AIMessageChunk>) {
                fullAIMessage = fullAIMessage ? fullAIMessage.concat(chunk):chunk;
                // 判断是否存在工具调用
                // !! 双重否定就是肯定
                // 一定是boolean 类型
                const hasToolCall = !!fullAIMessage.tool_call_chunks && 
                fullAIMessage.tool_call_chunks.length > 0;
                
                // push
                if (!hasToolCall && chunk.content) {
                    yield chunk.content as string;
                }
            }

            if (! fullAIMessage) {
                return ;
            }

            messages.push(fullAIMessage);
            const toolCalls = fullAIMessage.tool_calls??[];
            if (!toolCalls.length) {
                return ;
            }
            
            for (const toolCall of toolCalls) {
                const toolCallId = toolCall.id || '';
                const toolName = toolCall.name;
                if (toolName === 'db_users_crud') {
                    const result = await this.dbUsersCrudTool.invoke(toolCall.args);
                    messages.push(
                        new ToolMessage({
                            tool_call_id: toolCallId,
                            name: toolName,
                            content: result,
                        })
                    )
                } else if (toolName === 'send_mail') {
                    const result = await this.sendMailTool.invoke(toolCall.args);
                    messages.push(
                        new ToolMessage({
                            tool_call_id: toolCallId,
                            name: toolName,
                            content: result,
                        })
                    )
                } else if (toolName === 'web_search') {
                    const result = await this.webSearchTool.invoke(toolCall.args);
                    messages.push(
                        new ToolMessage({
                            content: result,
                            name: toolName,
                            tool_call_id: toolCallId,
                        })
                    )
                } else if (toolName === 'time_now') {
                    const result = await this.timeNowTool.invoke(toolCall.args);
                    messages.push(
                        new ToolMessage({
                            content: result,
                            name: toolName,
                            tool_call_id: toolCallId,
                        })
                    )
                }
            }
        }
    }
}
