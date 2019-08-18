import { Module } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SignupModule,
    TypegooseModule.forRoot(
      'mongodb://localhost/demo',
    ),
    AuthModule],
})
export class ApplicationModule {}
