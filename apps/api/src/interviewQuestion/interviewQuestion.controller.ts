import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { InterviewQuestionService } from './interviewQuestion.service';
import { CreateInterviewQuestionDto } from './dto/createInterviewQuestion.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('interview-questions')
@ApiTags('interview-questions')
export class InterviewQuestionController {
  constructor(
    private readonly interviewQuestionService: InterviewQuestionService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    const interviewQuestions = await this.interviewQuestionService.getAll();
    return interviewQuestions;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() interviewQuestion: CreateInterviewQuestionDto) {
    const newInterviewQuestion = await this.interviewQuestionService.create(
      interviewQuestion,
    );
    return newInterviewQuestion;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: string) {
    const interviewQuestion = this.interviewQuestionService.getOne(id);

    if (!interviewQuestion) {
      throw new NotFoundException();
    }

    return interviewQuestion;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() interviewQuestion: CreateInterviewQuestionDto,
  ) {
    return this.interviewQuestionService.update(id, interviewQuestion);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateMany(
    @Body()
    updates: { id: string; data: Partial<CreateInterviewQuestionDto> }[],
  ) {
    const updatedQuestions = await this.interviewQuestionService.updateMany(
      updates,
    );
    return updatedQuestions;
  }

  @Get(':id/answers')
  @UseGuards(JwtAuthGuard)
  async getQuestionAnswers(@Param('id') questionId: string) {
    const answers = await this.interviewQuestionService.getQuestionAnswers(
      questionId,
    );

    if (answers.length === 0) {
      throw new NotFoundException('No answers found for this question');
    }

    return answers;
  }
}
