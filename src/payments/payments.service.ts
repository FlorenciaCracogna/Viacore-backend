import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { PaymentsRepository } from './payments.repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingRequests } from 'src/training-requests/entities/training-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  private preference: Preference;

  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly configService: ConfigService,
    @InjectRepository(TrainingRequests)
    private readonly trainingRequestOrmRepository: Repository<TrainingRequests>,
  ) {
    const client = new MercadoPagoConfig({
      accessToken: this.configService.get<string>('MP_ACCESS_TOKEN') ?? '',
    });
    this.preference = new Preference(client);
  }

  async createPreference(dto: CreatePaymentDto) {
    const trainingRequest = await this.trainingRequestOrmRepository.findOne({
      where: { id: dto.trainingRequestId },
      relations: ['training', 'user'],
    });

    if (!trainingRequest) {
      throw new NotFoundException('Solicitud de capacitación no encontrada');
    }

    const depositAmount =
      Number(this.configService.get('MP_DEPOSIT_AMOUNT')) || 30000;

    const payment = await this.paymentsRepository.create({
      user: trainingRequest.user,
      trainingRequest: trainingRequest,
      amount: depositAmount,
    });

    const response = await this.preference.create({
      body: {
        items: [
          {
            id: payment.id,
            title: `Seña - ${trainingRequest.training.title}`,
            quantity: 1,
            unit_price: depositAmount,
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: `${this.configService.get('FRONTEND_URL')}/payments/success`,
          failure: `${this.configService.get('FRONTEND_URL')}/payments/failure`,
          pending: `${this.configService.get('FRONTEND_URL')}/payments/pending`,
        },
        notification_url: `${this.configService.get('BACKEND_URL')}/payments/webhook`,
        external_reference: payment.id,
      },
    });

    return {
      paymentId: payment.id,
      init_point: response.init_point,
    };
  }
}
