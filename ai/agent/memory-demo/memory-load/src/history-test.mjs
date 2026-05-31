import { config } from 'dotenv';
config({ path: path.join(process.cwd(), '.env') });
import {
    ChatOpenAI
} from '@langchain/openai';
import {
    FileSystemChatMessageHistory
} from '@langchain/community/stores/message/file_system';
import {
    HumanMessage,
    AIMessage,
    SystemMessage,
} from '@langchain/core/messages';
import path from 'node:path';

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});

async function fileHistoryDemo() {
    const filePath = path.join(process.cwd(), "chat-history.json");
    const sessionId = "user_session_001"; // 新一轮会话的会话id

    const systemMessage = new SystemMessage(
        "你是一个友好、幽默的做菜助手，喜欢分享美食和烹饪技巧。"
    );
    console.log("[第一轮对话]");
    const history = new FileSystemChatMessageHistory({
        filePath: filePath, 
        sessionId: sessionId,
    });
    const userMessage1 = new HumanMessage("红烧肉怎么做？");
    await history.addMessage(userMessage1);

    const messages1 = [systemMessage, ...(await history.getMessages())];
    console.log(messages1);
    const response1 = await model.invoke(messages1);
    console.log(response1);
    await history.addMessage(response1);

    console.log(await history.getMessages());

    const userMessage2 = new HumanMessage("好吃吗？");
    await history.addMessage(userMessage2);

    const message2 = [systemMessage, ...(await history.getMessages())];
    const response2 = await model.invoke(message2);
    console.log("=".repeat(50));
    console.log(response2);
    await history.addMessage(response2);
}

fileHistoryDemo()
    .catch(console.error);