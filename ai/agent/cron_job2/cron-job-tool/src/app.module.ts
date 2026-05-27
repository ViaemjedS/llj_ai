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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'hello',
      entities: [User, Job],
      logging: true,
      synchronize: true,
    }),
    UsersModule,
    AiModule,
    ScheduleModule.forRoot(

    ),
    JobModule,
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
