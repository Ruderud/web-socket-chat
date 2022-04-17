import { Test, TestingModule } from '@nestjs/testing';
import { FrogService } from './frog.service';

describe('FrogService', () => {
  let service: FrogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrogService],
    }).compile();

    service = module.get<FrogService>(FrogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
