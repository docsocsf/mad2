import { Module, MiddlewareConsumer } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nest-modules/mailer';
import * as path from 'path';

@Module({
  imports: [
    SignupModule,
    TypegooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://localhost:27017/demo',
      {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        dbName: process.env.MONGO_DB_NAME || 'demo',
        useNewUrlParser: true,
      },
    ),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'frontend', 'build'),
      renderPath: '*',
    }),
    MailerModule.forRoot(
      {
        transport: {
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: 'pp2916@ic.ac.uk',
            pass: process.env.EMAIL_PASSWORD,
          },
        },
      },
    ),
  ],
})
export class ApplicationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('**');
  }
}
