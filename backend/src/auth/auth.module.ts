import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {DoCSocStrategy} from './docsoc.strategy';
import {PassportModule} from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [AuthService, DoCSocStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
