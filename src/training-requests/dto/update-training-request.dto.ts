import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTrainingRequestDto } from './create-training-request.dto';
import { RequestStatus } from '../enums/requests-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

import { IsEnum, IsOptional } from 'class-validator';

import { RequestStatus } from '../enums/requests-status.enum';

export class UpdateTrainingRequestDto extends PartialType(
  CreateTrainingRequestDto,
) {
  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus;
}