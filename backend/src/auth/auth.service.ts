import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {AuthResponse} from 'src/auth/models/authResponse.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<AuthResponse> {
    return (await axios.post(
      'https://auth.docsoc.co.uk/authorize',
      {
        user: username,
        pass: password,
      },
    )).data;
  }

  async login(user: any) {
    return this.jwtService.sign(user);
  }
}
