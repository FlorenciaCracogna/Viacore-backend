import { Module } from '@nestjs/common';

import { TrainingRequestService } from './training-request.service';

import { TrainingRequestController } from './training-request.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainingRequests } from './entities/training-request.entity';

import { TrainingRequestRepository } from './repositories/training-request.repository';

import { Users } from 'src/users/entities/user.entity';

import { EmailModule } from 'src/notifications/channels/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingRequests,
      Users,
    ]),

    EmailModule,
  ],

  controllers: [
    TrainingRequestController,
  ],

  providers: [
    TrainingRequestService,
    TrainingRequestRepository,
  ],

  exports: [TrainingRequestService],
})
export class TrainingRequestModule {}