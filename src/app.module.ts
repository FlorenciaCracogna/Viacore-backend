import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
<<<<<<< HEAD
import { TrainingModule } from './training/training.module';
import { TrainingService } from './training/training.service';
import { MeetingsModule } from './meetings/meetings.module';
import { TrainingRequestModule } from './training-requests/training-request.module';
=======
>>>>>>> 38a4dd0d53660728369e3a04a1009be4d7639123

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
      load: [typeorm],
      
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')!,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30m',
      },
    }),
<<<<<<< HEAD
    TrainingModule,
    MeetingsModule,
    TrainingRequestModule,
=======
>>>>>>> 38a4dd0d53660728369e3a04a1009be4d7639123
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(private readonly trainingService: TrainingService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  async onApplicationBootstrap() {
    await this.trainingService.addTraining();
    console.log('Capacitaciones cargadas');
  }
}
