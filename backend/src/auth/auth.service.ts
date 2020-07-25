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
    console.log("Beginning validation of user");
    var test = (await axios.post(
      'https://func.docsoc.co.uk/.netlify/functions/firebase_auth',
      {
        user: username,
        pass: password,
      },
    ).catch((error)=>{
      console.log(error);
      return null;
    }));
    console.log("Test obj data")
    console.log(test.data);
    return (await axios.post(
      'https://func.docsoc.co.uk/.netlify/functions/firebase_auth',
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
