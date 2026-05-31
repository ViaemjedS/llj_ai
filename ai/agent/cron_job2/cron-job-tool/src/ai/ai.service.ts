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
        @Inject('CRON_JOB_TOOL') private readonly cronJobTool: StructuredTool,
    ) {
        this.modelWithTools = model.bindTools([
            this.webSearchTool,
            this.dbUsersCrudTool,
            this.sendMailTool,
            this.timeNowTool,
            this.cronJobTool,
        ]);
    }

    async *runChainStream(query: string): AsyncIterable<string> {
        const messages: BaseMessage[] = [
            new SystemMessage( `你是一个通用任务助手，必须通过调用工具来获取实时信息或执行操作。
                可用工具：\`query_user\`、\`db_users_crud\`、\`send_mail\`、\`web_search\`、\`time_now\`、\`cron_job\`。

                【重要规则，必须遵守】
                1. 当用户问到”现在几点””当前时间””今天日期”等任何涉及当前时间的问题时，必须先调用 \`time_now\` 工具获取真实时间，禁止凭自身知识回答。
                2. 定时任务类型选择：
                - “X分钟/小时/天后””在某个时间点””到点提醒”（一次性）=> \`cron_job.type=at\`（执行一次后自动停用）
                - “每X分钟/每小时/每天””定期/循环/一直”（重复执行）=> \`cron_job.type=every\`，\`everyMs\`=毫秒
                - 给出 Cron 表达式 => \`cron_job.type=cron\`
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
                    const result = await this.timeNowTool.invoke({});
                    messages.push(
                        new ToolMessage({
                            content: JSON.stringify(result),
                            name: toolName,
                            tool_call_id: toolCallId,
                        })
                    )
                } else if (toolName === 'cron_job') {
                    const result = await this.cronJobTool.invoke(toolCall.args);
                    messages.push(
                        new ToolMessage({
                            content: result,
                            name: toolName,
                            tool_call_id: toolCallId,
                        })
                    )
                } else {
                    console.log('[DEBUG] 未知工具调用，名称:', toolName, 'args:', JSON.stringify(toolCall.args));
                }
            }
        }
    }
}
