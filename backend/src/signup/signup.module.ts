import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Fresher } from './models/mongo/fresher.model';
import { Parent } from './models/mongo/parent.model';
import { Marriage } from './models/mongo/marriage.model';
import { Family } from './models/mongo/family.model';

@Module({
  imports: [
    TypegooseModule.forFeature(
      [
        Fresher,
        Parent,
        Marriage,
        Family,
      ],
    ),
  ],

  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
