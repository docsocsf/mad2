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
import { ParentResponse } from './models/responses/parentResponse.model';
import { Marriage } from './models/mongo/marriage.model';
import { AuthGuard } from '@nestjs/passport';
import { ProposalsResponse } from './models/responses/proposals.model';

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

  @UseGuards(AuthGuard('jwt'))
  @Post('parent')
  async parentSignup(@Body() parent: Parent): Promise<ParentResponse> {
    return await this.signupService.createParent(parent);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('parent')
  async findAllParents(): Promise<Parent[]> | null {
    return await this.signupService.findAllParents();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('marriages')
  async findAllMarriages(): Promise<Marriage[]> | null {
    const marriages = await this.signupService.findAllMarriages();
    return marriages;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('proposals')
  async proposals(@Request() req: any): Promise<ProposalsResponse> {
    const shortcode: string = req.user.data.Login;

    return new ProposalsResponse(
      await this.signupService.proposalsFromSelf(shortcode),
      await this.signupService.proposalsToSelf(shortcode),
    );
  }
}
