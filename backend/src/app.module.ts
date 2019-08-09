import { Module } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    SignupModule,
    TypegooseModule.forRoot(
      'mongodb://localhost/demo',
    )],
})
export class ApplicationModule {}
