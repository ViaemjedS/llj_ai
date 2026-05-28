import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module'
import { z } from 'zod';
import { tool } from '@langchain/core/tools';
import { ToolModule } from '../tool/tool.module';

@Module({
  imports: [UsersModule, ToolModule],
  controllers: [AiController],
  providers: [
    AiService,
    UsersService,
    {
      provide: 'DB_USERS_CRUD_TOOL',
      useFactory: (usersService: UsersService) => {
        const dbUsersCrudArgsSchema = z.object({
          // 枚举
          action: z
            .enum(['create','list','get','update','delete'])
            .describe('要执行的操作：create、list、get、update、delete'),
          id: z
            .number()
            .int()
            .positive()
            .optional()
            .describe('用户 ID（get / update / delete 时需要）'),
          name: z
            .string()
            .min(1)
            .max(50)
            .optional()
            .describe('用户姓名(create / update 时需要)'),
          email: z
            .string()
            .email()
            .max(50)
            .optional()
            .describe('用户邮箱(create / update 时可用)'),
        });
        return tool(
          async ({
            action,
            id,
            name,
            email,
          }: {
            action: 'create' | 'list' | 'get' | 'update' | 'delete';
            id?: number;
            name?: string;
            email?: string;
          }) => {
            switch (action) {
              case 'create': {
                if (!name || !email) {
                  return 'create 操作需要同时提供 name 和 email 字段'
                }
                const created = await usersService.create({name, email});
                return `成功创建用户：${created.id}, 姓名=${created.name}, 邮箱=${created.email}`
              }
              case 'list': {}
              case 'get': {}
              case 'update': {}
              case 'delete': {}
              default:
                return `不支持的操作：${action}`
            }
          },
          {
            name: 'db_users_crud',
            description: `用于对数据库中的users表进行 增删改查（crud） 操作。
            通过action 字段选择 create/list/get/update/delete，并按需提供id、name、email等参数
            `,
            schema: dbUsersCrudArgsSchema,
          }
        )
      },
      inject: [UsersService],
    }
  ],
})
export class AiModule {}
