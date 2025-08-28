export type Message = {
    role: 'user' | 'assistant' | 'system' | 'tool'
    content: string
    
}

export type ChatResponse = {
    model: string;
    created_at: string;
    message: Message;
    done: boolean;
    total_duration: number;
    prompt_eval_count: number;
    prompt_eval_duration: number;
    eval_count: number;
    eval_duration: number;
}

export type ChatRequest = {
    model: string;
    messages: Message[];
    stream?:boolean; // 可选的 默认是false
}