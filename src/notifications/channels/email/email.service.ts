import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  async sendWelcomeEmail(
    email: string,
    fullName: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Bienvenido a ViaCore',

      template: 'welcome',

      context: {
        fullName,
      },
    });
  }

  async sendPaymentApproved(
    email: string,
    fullName: string,
    amount: number,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Pago aprobado',

      template: 'payment-approved',

      context: {
        fullName,
        amount,
      },
    });
  }

  async sendTrainingRequestCreated(
    email: string,
    companyName: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject:
        'Nueva solicitud de capacitación',

      template:
        'training-request-created',

      context: {
        companyName,
      },
    });
  }

  async sendMeetingCreated(
    email: string,
    companyName: string,
    meetingDate: string,
  ) {
    await this.mailerService.sendMail({
      to: email,

      subject: 'Reunión agendada',

      template: 'meeting-created',

      context: {
        companyName,
        meetingDate,
      },
    });
  }
}