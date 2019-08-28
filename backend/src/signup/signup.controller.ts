import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';

import { SignupService } from './signup.service';
import { Fresher } from './models/mongo/fresher.model';
import { Parent } from './models/mongo/parent.model';
import { Marriage } from './models/mongo/marriage.model';
import { AuthGuard } from '@nestjs/passport';
import { Proposal } from './models/dto/requests/propose.model';
import {ParentStatus} from './models/dto/responses/parentStatus.model';

@Controller('api/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('fresher')
  async fresherSignup(@Body() fresher: Fresher): Promise<Fresher> {
    return await this.signupService.createFresher(fresher);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('parent')
  async parentSignup(@Body() parent: Parent): Promise<void> {
    await this.signupService.createParent(parent);
    return;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('marriages')
  async findAllMarriages(): Promise<Marriage[]> | null {
    const marriages = await this.signupService.findAllMarriages();
    return marriages;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('parent/propose')
  async propose(@Request() req: any, @Body() proposal: Proposal) {
    return await this.signupService.propose(req.user.data.Login, proposal.partnerShortcode);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('parent/status')
  async status(@Request() req: any): Promise<ParentStatus> {
    const shortcode: string = req.user.data.Login;
    return await this.signupService.parentStatus(shortcode);
  }
}
