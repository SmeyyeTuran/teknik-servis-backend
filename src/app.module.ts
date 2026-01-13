import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './config/firebase.module';
import { HealthController } from './health.controller';

// Feature Modules
import { AuthModule } from './modules/auth/auth.module';
import { OtpModule } from './modules/otp/otp.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ProformasModule } from './modules/proformas/proformas.module';
import { RequestsModule } from './modules/requests/requests.module';
import { ServiceFormsModule } from './modules/service-forms/service-forms.module';
import { TechniciansModule } from './modules/technicians/technicians.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // Environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Feature modules
    AuthModule,
    OtpModule,
    NotificationsModule,
    ProformasModule,
    RequestsModule,
    ServiceFormsModule,
    TechniciansModule,
    UsersModule,
    FirebaseModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
