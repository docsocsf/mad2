import { Controller, Post, Body, Get } from '@nestjs/common';
import { FresherService } from './fresher.service';
import { CreateFresherDto } from './create-fresher.dto';
import { Fresher } from './fresher.interface';

type RequestJson = { [key: string]: any };

@Controller('api/signup')
export class FresherController {
  constructor(private readonly fresherService: FresherService) {}

  @Post('/fresher')
  registerFresher(@Body() body: CreateFresherDto) {
    this.fresherService.create(body);
  }

  @Get('/fresher')
  async findAll(): Promise<Fresher[]> {
    return this.fresherService.findAll();
  }

  @Post('/fresher2')
  registerFresher2(@Body() body: RequestJson): { fullName: string } {
    return {
      fullName: body.student.firstName + ' ' + body.student.lastName,
    };
  }
}
