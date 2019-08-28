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
import { ProposalsResponse } from './models/dto/responses/proposals.model';
import { Proposal } from './models/dto/requests/propose.model';

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
    return await this.signupService.propose(req.user.Login, proposal.partnerShortcode);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('parent/proposals')
  async proposals(@Request() req: any): Promise<ProposalsResponse> {
    const shortcode: string = req.user.data.Login;

    return new ProposalsResponse(
      await this.signupService.proposalsFromSelf(shortcode),
      await this.signupService.proposalsToSelf(shortcode),
    );
  }
}
