import {
    Injectable,
    Inject,
} from '@nestjs/common';
import {
    ConfigService,
} from '@nestjs/config';
import {
    tool
} from '@langchain/core/tools';
import { z } from 'zod';

@Injectable()
export class WebSearchToolService {
    readonly tool;

    @Inject(ConfigService)
    private readonly configService: ConfigService

    constructor() {
        const webSearchToolSchema = z.object({
            query: z.string().describe('搜索关键词，例如： 公司年报、某个事件'),
            count: z.number().int().min(1).max(200).optional().describe('返回的搜索结果的数量，默认10条')
        });
        this.tool = tool(
            async ({ query, count } : { query: string, count?: number }) => {
                const apiKey = this.configService.get<string>('BOCHA_API_KEY');
                if (!apiKey) {
                    return 'BOCHA_API_KEY 环境变量未配置'
                }
                const url = 'https://api.bochaai.com/v1/web-search';
                const body = {
                    query,
                    // 不限制时间
                    freshness: 'noLimit',
                    summary: true,
                    count: count??10
                };
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    return `搜索API请求失败，状态码:${response.status}，错误信息:${errorText}`
                }

                let json: any;

                try {
                    json = await response.json();
                } catch(e) {
                    return `搜索API响应失败，错误信息:${(e as Error).message}`;
                }

                try {
                        if (json.code !== 200 || !json.data) {
                        return`搜索 API 请求失败，原因是: ${json.msg ?? '未知错误'}`;
                    }
                    // ?? 空值合并运算符。当左侧为 null 或 undefined 时返回右侧，否则返回左侧。
                    const webpages = json.data.webPages?.value ?? [];
                    if (!webpages.length) {
                        return'未找到相关结果。';
                    }
      
                    const formatted = webpages
                        .map(
                            (page: any, idx: number) =>
                            `引用: ${idx + 1}
                            标题: ${page.name}
                            URL: ${page.url}
                            摘要: ${page.summary}
                            网站名称: ${page.siteName}
                            网站图标: ${page.siteIcon}
                            发布时间: ${page.dateLastCrawled}`,
                        )
                        .join('\n\n');
            
                        return formatted;
                    } catch (e) {
                        return`搜索 API 请求失败，原因是：搜索结果解析失败 ${(e as Error).message}`;
                    }
            },
            {
                name: 'web_search',
                description: `使用BOCHA Web Search API搜索互联网网页。输入搜索关键字
                    (可选count 指定结果数量)，返回包含标题，URL，摘要，网站名词，图标和时间等信息的结果列表。`,
                schema: webSearchToolSchema,
            }
            
        )
    }
}

