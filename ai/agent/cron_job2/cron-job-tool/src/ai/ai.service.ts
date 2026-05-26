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

@Injectable()
export class AiService {
    private readonly modelWithTools: Runnable<BaseMessage[], AIMessage>;
}
