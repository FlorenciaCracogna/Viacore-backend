import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

export interface CreateOneOffEventDto {
  name: string;

  startTime: string;

  endTime: string;

  guestEmail: string;

  guestName: string;
}

@Injectable()
export class CalendlyService {
  private readonly logger = new Logger(CalendlyService.name);

  // Se cachea el user URI para evitar solicitarlo
  // en cada request a la API de Calendly.
  private userUri: string | null = null;

  constructor(private readonly httpService: HttpService) {}

  // Se obtiene automáticamente el user URI desde Calendly.
  // Esto evita depender de variables manuales en .env.
  async getCurrentUserUri(): Promise<string> {
    if (this.userUri) {
      return this.userUri;
    }

    const { data } = await firstValueFrom(
      this.httpService.get('/users/me'),
    );

    this.userUri = data.resource.uri;

    return this.userUri!;
  }

  async createOneOffEvent(dto: CreateOneOffEventDto): Promise<any> {
    try {
      const userUri = await this.getCurrentUserUri();

      // Calendly requiere duración y configuración de fecha
      // para crear eventos dinámicos tipo one-off.
      const payload = {
        name: dto.name,

        host: userUri,

        duration: 30,

        date_setting: {
          type: 'date_range',

          start_date: dto.startTime.split('T')[0],

          end_date: dto.endTime.split('T')[0],
        },

        end_time: dto.endTime,

        // Temporalmente usamos Zoom integrado automáticamente.
        location: {
          kind: 'zoom_conference',
        },
      };

      const { data } = await firstValueFrom(
        this.httpService.post('/one_off_event_types', payload),
      );

      this.logger.log(
        `Scheduling URL creada: ${data.resource?.scheduling_url}`,
      );

      return data.resource;
    } catch (error: any) {
      this.logger.error(
        error?.response?.data || error.message,
      );

      throw new InternalServerErrorException(
        'Error al crear evento en Calendly',
      );
    }
  }

  // Se deja preparado el manejo de webhooks para futuras
// sincronizaciones automáticas entre Calendly y el backend.
async handleWebhook(payload: any) {
  this.logger.log(
    `Webhook recibido desde Calendly: ${payload?.event}`,
  );

  return {
    received: true,
  };
}
}
