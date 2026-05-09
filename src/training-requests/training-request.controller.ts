import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Req,
  UseGuards,
  Query,
  ParseEnumPipe,
} from '@nestjs/common';
import { TrainingRequestService } from './training-request.service';
import { CreateTrainingRequestDto } from './dto/create-training-request.dto';
import { UpdateTrainingRequestDto } from './dto/update-training-request.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import type { RequestWithUsers } from './interfaces/requests-payloads.interfaces';
import { Role } from '../users/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import type { PaginatedTrainingRequests } from './interfaces/requests-results.interface';
import { RequestStatus } from './enums/requests-status.enum';
import type { TrainingRequests } from './entities/training-request.entity';

@ApiTags('Training Requests')
@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)
@Controller('training-requests')
export class TrainingRequestController {
  constructor(
    private readonly trainingRequestService: TrainingRequestService,
  ) { }

  @Post()
  @ApiOperation({
    summary:
      'Crea una nueva solicitud de capacitación',
  })
  @ApiResponse({
    status: 201,
    description:
      'La solicitud ha sido creada con éxito.',
  })
  async create(
    @Body()
    createTrainingRequestDto: CreateTrainingRequestDto,
    @Req()
    req: RequestWithUsers,
  ) {
    const userId = req.user.id;
    return await this.trainingRequestService.create(
      createTrainingRequestDto,
      userId,
    );
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Obtener todas las solicitudes (Solo Admin)'
  })
  @ApiResponse({
    status: 200, description: 'Lista de solicitudes obtenida con éxito.'
  })
  @ApiResponse({
    status: 403, description: 'Prohibido. Se requiere rol de Admin.'
  })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query(
      'status', new ParseEnumPipe(
        RequestStatus, { optional: true }
      )
    ) status?: RequestStatus,
  ): Promise<PaginatedTrainingRequests> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return await this.trainingRequestService.findAll(
      pageNumber, limitNumber, status
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una solicitud de capacitación por id'
  })
  @ApiResponse({
    status: 200, description: 'Solicitud encontrada.'
  })
  @ApiResponse({
    status: 404, description: 'Solicitud no encontrada.'
  })
  async findOne(
    @Param('id') id: string
  ): Promise<TrainingRequests> {
    return await this.trainingRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza una solicitud de capacitación'
  })
  @ApiResponse({
    status: 200, description: 'Solicitud actualizada con éxito.'
  })
  async update(
    @Param('id') id: string,
    @Body() updateTrainingRequestDto: UpdateTrainingRequestDto,
  ): Promise<TrainingRequests> {
    return await this.trainingRequestService.update(
      id, updateTrainingRequestDto
    );
  }
}