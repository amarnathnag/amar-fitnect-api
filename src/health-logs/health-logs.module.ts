import { Module } from '@nestjs/common';
import { HealthLogsController } from './health-logs.controller';
import { HealthLogsService } from './health-logs.service';

@Module({
  controllers: [HealthLogsController],
  providers: [HealthLogsService]
})
export class HealthLogsModule {}
