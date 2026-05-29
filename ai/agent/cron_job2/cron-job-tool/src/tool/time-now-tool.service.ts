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
                return JSON.stringify({
                    iso: now.toISOString(),
                    timestamp: now.getTime(),
                });
            },
            {
                name: 'time_now',
                description: '获取当前服务器时间，返回ISO 字符串(iso) 和毫秒级时间戳（timestap）',
                schema: z.object({}),
            }
        )
    }
    
}