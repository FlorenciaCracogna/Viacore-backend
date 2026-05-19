import { Body, Controller, Post } from '@nestjs/common';

import { CalendlyService } from './calendly.service';

@Controller('calendly')
export class CalendlyController {
  constructor(private readonly calendlyService: CalendlyService) {}

  // Este endpoint recibirá eventos enviados automáticamente
  // por Calendly cuando una reunión sea creada o cancelada.
  @Post('webhook')
  async webhook(@Body() payload: any) {
    return this.calendlyService.handleWebhook(payload);
  }
}