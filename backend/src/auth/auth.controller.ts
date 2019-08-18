import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Controller('api')
export class AuthController {

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any): Promise<any> {
    return req.user;
  }
}
