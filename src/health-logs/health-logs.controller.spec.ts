import { Test, TestingModule } from '@nestjs/testing';
import { HealthLogsController } from './health-logs.controller';

describe('HealthLogsController', () => {
  let controller: HealthLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthLogsController],
    }).compile();

    controller = module.get<HealthLogsController>(HealthLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
