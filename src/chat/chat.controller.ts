import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { ChatMessage } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import type { ICreateChatMessage } from './interfaces/create-chat-message.interface';

@ApiTags('Chat')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ groups: ['get'] })
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) { }

  @Post()
  @ApiBearerAuth('Bearer')
  @ApiOperation({
    summary: 'Enviar un nuevo mensaje (Soporta usuarios anónimos y logueados)',
  })
  @ApiResponse({
    status: 201,
    type: ChatMessage,
  })
  async create(
    @Body()
    createChatDto: CreateChatDto,
    @Req()
    req: any,
  ): Promise<ChatMessage> {
    const servicePayload: ICreateChatMessage = {
      message: createChatDto.message,
      trainingRequestId: createChatDto.trainingRequestId,
      receiverId: createChatDto.receiverId,
      sessionId: createChatDto.sessionId,
    };
    let userId: string | undefined = undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = this.jwtService.decode(token) as { id: string };
        userId = decoded?.id;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn('Token enviado no válido para decodificación silenciosa:', message);
      }
    }
    return await this.chatService.createMessage(
      servicePayload,
      userId,
    );
  }

  @Get('history/:identifier')
  @ApiBearerAuth('Bearer')
  @ApiOperation({
    summary: 'Obtiene el historial de chat mediante un ID de solicitud o un sessionId anónimo',
  })
  async getHistory(
    @Param('identifier')
    identifier: string,
  ): Promise<ChatMessage[]> {
    return await this.chatService.getChatHistory(identifier);
  }

  @Patch('link-history')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Bearer')
  @ApiOperation({
    summary: 'Une el historial anónimo acumulado a una solicitud y cuenta de usuario real (Conversión)',
  })
  async linkHistory(
    @Body()
    body: { sessionId: string; trainingRequestId: string },
    @Req()
    req: any,
  ) {
    const userId = req.user.id;
    await this.chatService.linkAnonymousHistory(
      body.sessionId,
      body.trainingRequestId,
      userId,
    );
    return { message: 'Historial unificado de forma exitosa.' };
  }
}