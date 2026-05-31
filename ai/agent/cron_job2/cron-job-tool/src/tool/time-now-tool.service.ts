// 获取当前时间
import { Injectable } from '@nestjs/common';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';

@Injectable()
export class TimeNowToolService {
    readonly tool;
    constructor() {
        this.tool = tool(
            async () => {
                const now = new Date();
                return {
                    iso: now.toISOString(),
                    timestamp: now.getTime(),
                };
            },
            {
                name: 'time_now',
                description: '获取当前服务器时间，返回ISO格式字符串(iso) 和毫秒级时间戳（timestamp）',
                schema: z.object({
                    _dummy: z.string().optional().describe('占位参数， 无需传入'),
                }),
            }
        )
    }
    
}