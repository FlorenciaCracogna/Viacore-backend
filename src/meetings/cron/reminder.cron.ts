import { Injectable } from '@nestjs/common';

import { Cron } from '@nestjs/schedule';

@Injectable()
export class ReminderCron {
  @Cron('*/5 * * * *')
  async handleCron() {
    console.log('Checking reminders...');
  }
}