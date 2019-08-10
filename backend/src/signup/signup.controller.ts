import { Controller, Get, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { Fresher } from './models/fresher.model';
import { Parent } from './models/parent.model';

@Controller('api/signup/')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('fresher')
  async createFresher(@Body() createFresherDto: Fresher): Promise<Fresher> {
    return await this.signupService.createFresher(createFresherDto);
  }

  @Get('fresher')
  async findAllFreshers(): Promise<Fresher[]> | null {
    return await this.signupService.findAllFreshers();
  }

  @Post('parent')
  async createParent(@Body() createParentDto: Parent): Promise<Parent> {
    return await this.signupService.createParent(createParentDto);
  }

  @Get('parent')
  async findAllParents(): Promise<Parent[]> | null {
    return await this.signupService.findAllParents();
  }
}
