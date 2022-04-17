import { Module } from '@nestjs/common';
import { FrogService } from './frog.service';
import { FrogController } from './frog.controller';

@Module({
  controllers: [FrogController],
  providers: [FrogService]
})
export class FrogModule {}
