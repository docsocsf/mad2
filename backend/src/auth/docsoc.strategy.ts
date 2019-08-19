import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthResponse} from 'src/auth/models/authResponse.model';

@Injectable()
export class DoCSocStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<AuthResponse> {
    const auth: AuthResponse = await this.authService.validateUser(username, password);
    if (!auth.auth) {
      throw new UnauthorizedException();
    }
    return auth;
  }
}
