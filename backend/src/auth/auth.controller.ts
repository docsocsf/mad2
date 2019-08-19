import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';

@Controller('api')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any): Promise<any> {
    const token: string = await this.authService.login(req.user);
    req.res.cookie(
      'Authorization',
      'Bearer ' + token,
      {
        httpOnly: true,
      },
    );
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
