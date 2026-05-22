import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';

import { Meetings } from './entities/meeting.entity';

import { CalendlyModule } from 'src/calendly/calendly.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meetings]),
    CalendlyModule,
    NotificationsModule,
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService],
})
export class MeetingsModule {}
