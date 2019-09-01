import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  app.enableCors();
  app.use(morgan('tiny'));
  app.use(helmet());
  app.useStaticAssets(path.join(__dirname, '..',  '..', 'frontend', 'build'));
  await app.listen(8080);
}
bootstrap();
