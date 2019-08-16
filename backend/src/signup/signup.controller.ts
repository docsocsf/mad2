import { Controller, Get, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { Fresher } from './models/mongo/fresher.model';
import { Parent } from './models/mongo/parent.model';
import { ParentResponse } from './models/responses/parentResponse.model';
import { Marriage } from './models/mongo/marriage.model';

@Controller('api/signup/')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('fresher')
  async fresherSignup(@Body() fresher: Fresher): Promise<Fresher> {
    return await this.signupService.createFresher(fresher);
  }

  @Get('fresher')
  async findAllFreshers(): Promise<Fresher[]> | null {
    return await this.signupService.findAllFreshers();
  }

  @Post('parent')
  async parentSignup(@Body() parent: Parent): Promise<ParentResponse> {
    return await this.signupService.createParent(parent);
  }

  @Get('parent')
  async findAllParents(): Promise<Parent[]> | null {
    return await this.signupService.findAllParents();
  }

  @Get('marriages')
  async findAllMarriages(): Promise<Marriage[]> | null {
    const marriages = await this.signupService.findAllMarriages();
    console.log(marriages);
    return marriages;
  }
}
