import { Controller, Get, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { Fresher } from './models/fresher.model';

@Controller('api/signup/')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('fresher')
  async create(@Body() createFresherDto: Fresher): Promise<Fresher> {
    return await this.signupService.create(createFresherDto);
  }

  @Get('fresher')
  async findAll(): Promise<Fresher[]> | null {
    return await this.signupService.findAll();
  }
}
