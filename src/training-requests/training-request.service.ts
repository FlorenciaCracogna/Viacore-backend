import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTrainingRequestDto } from './dto/create-training-request.dto';
import { UpdateTrainingRequestDto } from './dto/update-training-request.dto';
import { TrainingRequestRepository } from './repositories/training-request.repository';
import { TrainingRequests } from './entities/training-request.entity';
import type { RequestStatus } from './enums/requests-status.enum';
import type { PaginatedTrainingRequests } from './interfaces/requests-results.interface';

@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly repository: TrainingRequestRepository) { }

  async create(
    createTrainingRequestDto: CreateTrainingRequestDto,
    userId: string
  ): Promise<TrainingRequests> {
    const requestData = {
      ...createTrainingRequestDto,
      user: { id: userId },
    };
    return await this.repository.createRequests(requestData);;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    status?: RequestStatus
  ): Promise<PaginatedTrainingRequests> {
    const skip = (page - 1) * limit;
    const [requests, total] =
      await this.repository.findAllRequests(
        skip, limit, status
      );
    return {
      data: requests,
      meta: {
        totalItems: total,
        itemCount: requests.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: string): Promise<TrainingRequests> {
    return await this.repository.findRequestById(
      id,
    );
  }

  async update(
    id: string,
    updateTrainingRequestDto: UpdateTrainingRequestDto,
  ): Promise<TrainingRequests> {
    return await this.repository.updateRequest(
      id,
      updateTrainingRequestDto,
    );
  }
}
