import { Json } from '@internship-app/types/src/json';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Discipline,
  DisciplineStatus,
  InterviewStatus,
  TestStatus,
} from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { CreateInternDto } from './dto/createIntern.dto';

@Injectable()
export class InternService {
  constructor(private readonly prisma: PrismaService) {}

  async get(id: string) {
    return await this.prisma.intern.findUnique({
      where: { id },
      include: {
        internDisciplines: true,
      },
    });
  }

  async getAll() {
    const interns = await this.prisma.intern.findMany({
      include: {
        internDisciplines: {
          orderBy: {
            priority: 'asc',
          },
        },
        interviewSlot: {
          select: {
            score: true,
          },
        },
      },
    });

    return interns;
  }

  async getApplicationStatus(id: string) {
    const applicationInfo = await this.prisma.intern.findUnique({
      where: { id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        internDisciplines: {
          select: {
            discipline: true,
            status: true,
            testStatus: true,
            testScore: true,
            testSlot: {
              select: {
                start: true,
                end: true,
                maxPoints: true,
              },
            },
          },
        },
        interviewSlot: {
          select: {
            start: true,
            end: true,
          },
        },
      },
    });

    return applicationInfo;
  }

  async create(internToCreate: CreateInternDto) {
    const internWithTheSameEmail = await this.prisma.intern.findFirst({
      where: {
        email: {
          equals: internToCreate.email,
          mode: 'insensitive',
        },
      },
    });

    if (internWithTheSameEmail) {
      throw new BadRequestException(
        'Intern with the same email already exists',
      );
    }

    const interviewStatus = internToCreate.disciplines.some(
      (ind) => ind === Discipline.Development,
    )
      ? InterviewStatus.NoRight
      : InterviewStatus.PickTerm;

    const getTestStatus = (discipline) =>
      [Discipline.Development, Discipline.Design].includes(discipline)
        ? TestStatus.PickTerm
        : null;

    const newIntern = await this.prisma.intern.create({
      data: {
        firstName: internToCreate.firstName,
        lastName: internToCreate.lastName,
        email: internToCreate.email,
        data: internToCreate.data,
        interviewStatus: interviewStatus,
        internDisciplines: {
          createMany: {
            data: internToCreate.disciplines.map((ind, index) => ({
              discipline: ind,
              priority: index,
              status: DisciplineStatus.Pending,
              testStatus: getTestStatus(ind),
            })),
          },
        },
      },
    });

    return newIntern;
  }

  async setInterview(internId: string, answers: Json) {
    await this.prisma.interviewSlot.update({
      where: {
        internId: internId,
      },
      data: {
        answers: answers,
      },
    });
  }
}
