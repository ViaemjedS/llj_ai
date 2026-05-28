import { 
    Injectable,   // 注入服务
    Inject        // 注入依赖
} from '@nestjs/common';
import {
    ConfigService
} from '@nestjs/config';
import {
    ChatOpenAI
} from '@langchain/openai'

@Injectable()
export class LlmService {
    @Inject(ConfigService)
    private readonly configService: ConfigService;

    getModel():ChatOpenAI {
        return new ChatOpenAI({
            model: this.configService.get('MODEL_NAME'),
            apiKey: this.configService.get('OPENAI_API_KEY'),
            configuration: {
                baseURL: this.configService.get('OPENAI_API_BASE_URL'),
            }
        })
    }
}
