import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { UserService } from './user.service';
import { z } from 'zod';
import { tool } from '@langchain/core/tools';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    UserService,
    // provide 动态创建的
    // 将model 从逻辑中剥离出来
    // llm 作为 provide 提供
    {
      provide: 'CHAT_MODEL',
      // 工厂模式, 车，摩托车， 坦克...
      useFactory: (configService: ConfigService) => {
        return new ChatOpenAI({
          modelName: configService.get('MODEL_NAME'),
          apiKey: configService.get('OPENAI_API_KEY'),
          configuration: {
            baseURL: configService.get('OPENAI_BASE_URL'),
          }
        })
      },
      inject: [ConfigService]
    },
    {
        provide: 'QUERY_USER_TOOL',
        useFactory: (userService: UserService) => {
            const queryUserArgsSchema = z.object({
                userId: z.string().describe('用户ID， 例如：001，002，003')
            });
            return tool(
                async({userId}: {userId: string}) => {
                    const user = userService.findOne(userId);
                    if (!user) {
                        const availableIds = userService
                            .findAll()
                            .map(u => u.id)
                            .join(', ');
                        return `用户${userId}不存在， 可用用户ID：${availableIds}`;
                    }
                    return `用户信息: \n -ID::${user.id}\n -Name::${user.name}\n -Email::${user.email}\n -Role::${user.role}`;
                },
                {
                    name: 'query_user',
                    description: '查询数据库中的用户信息。输入用户ID，返回该用户的详细信息(如姓名，邮箱，角色)',
                    schema: queryUserArgsSchema,
                }
            )
        },
        inject: [UserService]
    }
  ]
})
export class AiModule { }
