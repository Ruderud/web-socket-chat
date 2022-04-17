import { Test, TestingModule } from '@nestjs/testing';
import { FrogController } from './frog.controller';
import { FrogService } from './frog.service';

describe('FrogController', () => {
  let controller: FrogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrogController],
      providers: [FrogService],
    }).compile();

    controller = module.get<FrogController>(FrogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
