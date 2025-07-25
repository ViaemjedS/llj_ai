/*  
    chat 聊天

*/
const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions'
export const chat = async (
    messages, 
    api_url=DEEPSEEK_CHAT_API_URL,
    api_key=import.meta.env.VITE_DEEPSEEK_API_KEY,
    model='deepseek-chat'
) => {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model: model,
                messages,
                stream: false,
            })
        });
        const data = await response.json();
        console.log(data)
        return {
            code: 0,
            data: {
                role: 'assistant',
                content: data.choices[0].message.content
            }
        }
    } catch(err) {
        return {
            code: 0,
            msg: 'error...'
        }
    }
}

export const kimiChat = async (messages) => {
    const res = await chat(
        messages,
    );
    return res
}