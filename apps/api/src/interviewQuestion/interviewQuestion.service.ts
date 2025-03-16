import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InterviewQuestionType, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateInterviewQuestionDto } from './dto/createInterviewQuestion.dto';

@Injectable()
export class InterviewQuestionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInterviewQuestionDto) {
    this.validateQuestionOptions(dto);

    return this.prisma.interviewQuestion.create({
      data: {
        title: dto.title,
        type: dto.type,
        category: dto.category,
        status: dto.status,
        options: dto.options,
      },
    });
  }

  async getAll() {
    const interviewQuestions = await this.prisma.interviewQuestion.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return interviewQuestions;
  }

  async getOne(id: string) {
    return this.prisma.interviewQuestion.findUnique({
      where: { id },
    });
  }

  async updateMany(
    updates: { id: string; data: Partial<CreateInterviewQuestionDto> }[],
  ) {
    for (const update of updates) {
      const mergedDto = {
        ...update.data,
        type: update.data.type ?? InterviewQuestionType.Field,
      };

      this.validateQuestionOptions(mergedDto as CreateInterviewQuestionDto);
    }

    return this.prisma.$transaction(
      updates.map((update) =>
        this.prisma.interviewQuestion.update({
          where: { id: update.id },
          data: update.data,
        }),
      ),
    );
  }

  async update(id: string, dto: CreateInterviewQuestionDto) {
    this.validateQuestionOptions(dto);

    return this.prisma.interviewQuestion.update({
      where: { id },
      data: {
        title: dto.title,
        type: dto.type,
        category: dto.category,
        status: dto.status,
        options: dto.options,
      },
    });
  }

  async getQuestionAnswers(questionId: string) {
    const question = await this.prisma.interviewQuestion.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new NotFoundException('Pitanje nije pronađeno');
    }

    const slots = await this.prisma.interviewSlot.findMany({
      where: {
        answers: {
          path: ['$.answers[*].questionId'],
          array_contains: [questionId],
        },
      },
      include: {
        intern: true,
      },
    });

    const answers = slots.flatMap((slot) => {
      try {
        const parsed = JSON.parse(slot.answers.toString());

        if (!parsed?.answers || !Array.isArray(parsed.answers)) {
          console.error('Nevalidan format odgovora za slot:', slot.id);
          return [];
        }

        return parsed.answers
          .filter(
            (a) => a.questionId?.toLowerCase() === questionId.toLowerCase(),
          )
          .map((a) => ({
            ...a,
            slotId: slot.id,
            start: slot.start,
            intern: slot.intern
              ? {
                  id: slot.intern.id,
                  name: `${slot.intern.firstName} ${slot.intern.lastName}`,
                }
              : null,
          }));
      } catch (error) {
        console.error('Greška pri parsiranju:', error);
        return [];
      }
    });

    if (answers.length === 0) {
      throw new NotFoundException('Nema odgovora za ovo pitanje');
    }

    return answers;
  }

  private validateQuestionOptions(dto: CreateInterviewQuestionDto) {
    if (dto.type === InterviewQuestionType.Slider && dto.options) {
      if (
        !dto.options.min ||
        !dto.options.max ||
        !dto.options.step ||
        typeof dto.options.min !== 'number' ||
        typeof dto.options.max !== 'number' ||
        typeof dto.options.step !== 'number'
      ) {
        throw new BadRequestException(
          'Za slider opcije mora biti objekt s min, max i step svojstvima',
        );
      }
    }

    const selectableTypes = [
      InterviewQuestionType.Select,
      InterviewQuestionType.Radio,
      InterviewQuestionType.Checkbox,
    ] as string[];

    if (selectableTypes.includes(dto.type as string) && dto.options) {
      if (
        !Array.isArray(dto.options) ||
        !dto.options.every((item) => typeof item === 'string')
      ) {
        throw new BadRequestException(
          'Za select, radio i checkbox opcije mora biti polje stringova',
        );
      }
    }
  }
}
