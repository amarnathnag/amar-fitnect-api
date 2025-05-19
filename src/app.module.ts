import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PlansModule } from './plans/plans.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { HealthLogsModule } from './health-logs/health-logs.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, UsersModule, ProfilesModule, PlansModule, DoctorsModule, AppointmentsModule, SubscriptionsModule, HealthLogsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
