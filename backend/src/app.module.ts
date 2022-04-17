import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { FrogModule } from './frog/frog.module';

@Module({
  imports: [FrogModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
