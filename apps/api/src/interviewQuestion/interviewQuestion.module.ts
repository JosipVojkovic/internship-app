import { Module } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { InterviewQuestionService } from './interviewQuestion.service';
import { InterviewQuestionController } from './interviewQuestion.controller';

@Module({
  controllers: [InterviewQuestionController],
  providers: [InterviewQuestionService, LoggerService, PrismaService],
})
export class InterviewQuestionModule {}
