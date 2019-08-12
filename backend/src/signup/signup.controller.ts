import { Controller, Get, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { Fresher } from './models/fresher.model';
import { Parent } from './models/parent.model';

@Controller('api/signup/')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('fresher')
  async createFresher(@Body() fresher: Fresher): Promise<Fresher> {
    return await this.signupService.createFresher(fresher);
  }

  @Get('fresher')
  async findAllFreshers(): Promise<Fresher[]> | null {
    return await this.signupService.findAllFreshers();
  }

  @Post('parent')
  async createParent(@Body() parent: Parent): Promise<Parent> {
    return await this.signupService.createParent(parent);
  }

  @Get('parent')
  async findAllParents(): Promise<Parent[]> | null {
    return await this.signupService.findAllParents();
  }
}
