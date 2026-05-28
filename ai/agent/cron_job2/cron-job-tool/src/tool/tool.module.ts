import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { WebSearchToolService } from './web-search-tool.service';
import { DbUsersCrudToolService } from './db-users-crud-tool.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule],
    providers: [
        LlmService,
        WebSearchToolService,
        DbUsersCrudToolService,
        // 自定义的注入项
        {
            provide: 'CHAT_MODEL',
            useFactory: (llmService: LlmService) => llmService.getModel(),
            inject: [LlmService],
        },
        {
            provide: 'WEB_SEARCH_TOOL',
            useFactory: (webSearchToolService: WebSearchToolService) => webSearchToolService.tool,
            inject: [WebSearchToolService],
        },
        {
            provide: 'DB_USERS_CRUD_TOOL',
            useFactory: (dbUsersCrudToolService: DbUsersCrudToolService) => dbUsersCrudToolService.tool,
            inject: [DbUsersCrudToolService],
        },
    ],
    exports: [
        'CHAT_MODEL',
        'WEB_SEARCH_TOOL',
        'DB_USERS_CRUD_TOOL',
    ],
})
export class ToolModule {}
