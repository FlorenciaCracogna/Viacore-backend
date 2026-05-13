import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  trainingRequestId!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
