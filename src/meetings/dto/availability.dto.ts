import { IsDateString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityDto {
  @ApiProperty({
    example: '2026-05-25',
  })
  @IsDateString()
  date!: string;
}