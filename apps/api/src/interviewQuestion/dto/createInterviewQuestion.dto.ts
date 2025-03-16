import { ApiProperty } from '@nestjs/swagger';
import {
  InterviewQuestionCategory,
  InterviewQuestionStatus,
  InterviewQuestionType,
} from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInterviewQuestionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsEnum(InterviewQuestionType)
  @ApiProperty()
  type: InterviewQuestionType;

  @IsEnum(InterviewQuestionCategory)
  @ApiProperty()
  category: InterviewQuestionCategory;

  @IsEnum(InterviewQuestionStatus)
  @ApiProperty()
  status: InterviewQuestionStatus;

  @IsOptional()
  @ApiProperty()
  options?: any;
}
