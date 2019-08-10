import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Fresher } from 'src/signup/models/fresher.model';
import { Parent } from 'src/signup/models/parent.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Fresher]),
    TypegooseModule.forFeature([Parent]),
  ],

  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
