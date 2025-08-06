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

export const generateAvatar = async () => {
    // 设计prompt
    const prompt = `
        你是一位头像设计师，需要为用户设计头像，主打米山舞或藤本树风格。
        用户的信息是${text}。
        要求有个性，有设计感。
    `
}