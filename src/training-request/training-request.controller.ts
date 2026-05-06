import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingRequestService } from './training-request.service';
import { CreateTrainingRequestDto } from './dto/create-training-request.dto';
import { UpdateTrainingRequestDto } from './dto/update-training-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Training Requests')
@Controller('training-requests')
export class TrainingRequestController {
  constructor(private readonly trainingRequestService: TrainingRequestService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva solicitud de capacitación' })
  @ApiResponse({ status: 201, description: 'La solicitud ha sido creada con éxito.' })
  create(@Body() createTrainingRequestDto: CreateTrainingRequestDto) {
    return this.trainingRequestService.create(createTrainingRequestDto);
  }

  @Get()
  findAll() {
    return this.trainingRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingRequestDto: UpdateTrainingRequestDto) {
    return this.trainingRequestService.update(+id, updateTrainingRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingRequestService.remove(+id);
  }
}
