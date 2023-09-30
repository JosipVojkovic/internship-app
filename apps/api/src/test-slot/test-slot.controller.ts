import {
  CreateTestSlotDto,
  ScheduleTestRequest,
  TestSlotPreviewDto,
} from '@internship-app/types';
import { Discipline } from '@internship-app/types';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TestSlotService } from './test-slot.service';

@Controller('test-slot')
@ApiTags('test-slot')
export class TestSlotController {
  constructor(private readonly testSlotService: TestSlotService) {}

  @Get()
  async getAll() {
    const allSlots = await this.testSlotService.getAll();
    const testSlotsDto: TestSlotPreviewDto[] = allSlots.map((ts) => ({
      ...ts,
      discipline: ts.discipline as Discipline,
      internCount: ts._count.internDisciplines,
      questionCount: ts._count.testQuestions,
    }));

    return testSlotsDto;
  }

  @Post()
  async createTestSlotDto(@Body() testSlotDto: CreateTestSlotDto) {
    return await this.testSlotService.create(testSlotDto);
  }

  @Get('available/:discipline/:internId')
  async getAvailableSlots(
    @Param('internId') internId: string,
    @Param('discipline') discipline: Discipline,
  ) {
    return await this.testSlotService.getAvailableSlots(internId, discipline);
  }

  @Patch('schedule/:slotId')
  async scheduleTest(
    @Param('slotId') slotId: string,
    @Body() { internId }: ScheduleTestRequest,
  ) {
    return await this.testSlotService.scheduleTest(slotId, internId);
  }
}
