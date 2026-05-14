import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.paymentsService.findByUserId(userId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.paymentsService.findById(id);
  }

  @Post('create-preference')
  createPreference(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPreference(dto);
  }

  @Post('webhook')
  handleWebhook(@Body() body: { type: string; data: { id: string | number } }) {
    return this.paymentsService.handleWebhook(body);
  }
}
