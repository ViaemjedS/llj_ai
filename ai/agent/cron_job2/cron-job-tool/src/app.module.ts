import { Module, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AiModule } from './ai/ai.module';
// 定时任务
import { CronJob } from 'cron';
import { Job } from './job/entities/job.entity';
import { 
  CronExpression, 
  ScheduleModule, 
  SchedulerRegistry 
} from '@nestjs/schedule';
import { JobModule } from './job/job.module';
import { ToolModule } from './tool/tool.module';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          type: 'smtp',
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<string>('MAIL_PORT'),
          secure: configService.get<string>('MAIL_SECURE') === 'true',
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        default: {
          from: configService.get<string>('MAIL_FROM'),
        }
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: Number(configService.get<string>('MYSQL_PORT')),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        synchronize: true,  //自动同步数据库
        logging: true,
        entities: [User, Job],
      }),
    }),
    UsersModule,
    AiModule,
    ScheduleModule.forRoot(

    ),
    JobModule,
    ToolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements OnApplicationBootstrap {
  @Inject(SchedulerRegistry)
  schedulerRegistry: SchedulerRegistry;
  async onApplicationBootstrap() {
    // console.log('init');

    // const job = new CronJob(CronExpression.EVERY_SECOND,() => {
    //   console.log('run job')
    // });
    // this.schedulerRegistry.addCronJob('job1', job);
    // job.start();
    // setTimeout(() => {
    //   this.schedulerRegistry.getCronJob('job1').stop();
    // }, 5000);

    // const itervalRef = setInterval(() => {
    //   console.log('run interval job')
    // }, 1000);
    // this.schedulerRegistry.addInterval('intervalJob', itervalRef);
    // setTimeout(() => {
    //   this.schedulerRegistry.deleteInterval('intervalJob');
    // }, 5000);

    // const timeoutRef = setTimeout(() => {
    //   console.log('run timeout job')
    // }, 3000);
    // this.schedulerRegistry.addTimeout('timeout1', timeoutRef);
    // setTimeout(() => {
    //   this.schedulerRegistry.deleteTimeout('timeout1');
    // }, 5000);
  }

}
