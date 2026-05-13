import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentStatus } from './enums/payment-status.enum';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentOrmRepository: Repository<Payment>,
  ) {}

  async create(data: Partial<Payment>) {
    const payment = this.paymentOrmRepository.create(data);
    return await this.paymentOrmRepository.save(payment);
  }

  async findById(id: string) {
    return await this.paymentOrmRepository.findOne({ where: { id } });
  }

  async findByUserId(userId: string) {
    return await this.paymentOrmRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'trainingRequest'],
    });
  }

  async updateStatus(id: string, status: PaymentStatus) {
    await this.paymentOrmRepository.update(id, { status });
    return this.findById(id);
  }

  async updateMercadoPagoId(id: string, mercadoPagoId: string) {
    await this.paymentOrmRepository.update(id, { mercadoPagoId });
  }
}
