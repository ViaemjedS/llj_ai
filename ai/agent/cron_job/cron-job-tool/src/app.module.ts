import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { 
    ConfigModule,
    ConfigService
 } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    AiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // 邮件服务 异步 dotenv 读取之后
    MailerModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            transport: {
                //SMTP 服务器地址
                host: configService.get('MAIL_HOST'),
                //SMTP 服务器端口
                port: Number(configService.get('MAIL_PORT')),
                //是否使用 SSL/TLS 加密
                secure: configService.get<string>('MAIL_SECURE') === 'true',
                auth: {
                    //发件人邮箱账号
                    user: configService.get<string>('MAIL_USER'),
                    //邮箱授权码/密码
                    pass: configService.get<string>('MAIL_PASS')
                },
                defaults: {
                    //默认发件人显示名称
                    from: configService.get<string>('MAIL_FROM')
                }
            }
        })
    })
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
