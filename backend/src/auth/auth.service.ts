import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {AuthResponse} from 'src/auth/models/authResponse.model';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<AuthResponse> {
    return (await axios.post(
      'https://auth.docsoc.co.uk/authorize',
      {
        user: username,
        pass: password,
      },
    )).data;
  }
}
