import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateFresherDto } from './dto/create-fresher.dto';
import { FresherService } from './fresher.service';
import { Fresher } from './interfaces/fresher.interface';

@Controller('fresher')
export class FresherController {
  constructor(private readonly fresherService: FresherService) {}

  @Post()
  async create(@Body() createFresherDto: CreateFresherDto) {
    this.fresherService.create(createFresherDto);
  }

  @Get()
  async findAll(): Promise<Fresher[]> {
    return this.fresherService.findAll();
  }
}
