import OpenAI from 'openai/index.js'; // es6 module
// 导入并配置 dotenv
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
    apiKey: process.env.VITE_301_KEY || '',
    baseURL: 'https://api.302.ai/v1'
})

const getWeather = async (city) => {
    return {
        city,
        temp: "28",
        condition: "Sunny"
    }
}

async function main() {
    const resp = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: "今天抚州天气怎么样？"
            },
            
        ],
       
        // LLM 使用的工具
        tools: [
            // LLM 可以调用的tool 配置
            {
                type: 'function',
                function: {
                    name: "getWeather",
                    description: "获取某个城市的天气",
                    parameters: {
                        type: 'object',
                        properties: {
                            city: {
                                type: "string"
                            }
                        },
                        required: ["city"]
                    }
                }
            }
        ]
    });

    const toolCall = resp.choices[0].message.tool_calls?.[0];
    console.log("大模型想调用", toolCall);
    if (toolCall?.function.name === "getWeather") {
        const args = JSON.parse(toolCall.function.arguments);
        const weather = await getWeather(args.city);

        const secondResp = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: "user",
                    content: "抚州天气",
                },
                resp.choices[0].message,
                {
                    role: 'tool',
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(weather)
                }

            ]
        })
        console.log(secondResp.choices[0].message.content);
    }
}

main();