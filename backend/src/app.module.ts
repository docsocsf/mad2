import { Module, MiddlewareConsumer } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';

@Module({
  imports: [
    SignupModule,
    TypegooseModule.forRoot(
      'mongodb://localhost/demo',
    ),
    AuthModule],
})
export class ApplicationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('*');
  }
}
