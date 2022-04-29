import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//db connection
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Connection } from 'typeorm';
import { SequelizeModule } from '@nestjs/sequelize';

import {
  LoggerMiddleware,
  LoggerMiddleware2nd,
} from './common/middleware/logger.middleware';

import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

import { FrogModule } from './frog/frog.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    FrogModule,
    CatsModule,
    ChatsModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      models: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // constructor(private connection: Connection) {} //typeorm
  //configure는 기본적으로 async, await을 이용한 비동기처리
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({
        path: 'c*ts', // 와일드 카드 가능
        method: RequestMethod.GET, // cats route로 GET요청시에만 middleware를 거침. 그 이외는 그냥 바로 controller로 이동되어 처리됨
      })
      .apply(LoggerMiddleware2nd) //다음미들웨어로 넘기고싶다면 여기서 연결해야함
      .forRoutes(CatsController);

    // consumer.apply(LoggerMiddleware2nd).forRoutes(CatsController);
  }
}
