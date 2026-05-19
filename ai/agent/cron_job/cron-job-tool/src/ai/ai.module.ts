import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';


@Module({
  controllers: [AiController],
  providers: [
    AiService,
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
    }
  ]
})
export class AiModule { }
