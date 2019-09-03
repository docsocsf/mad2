import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  app.enableCors();
  app.use(morgan('common', {stream: fs.createWriteStream('../../mad.log', {flags: 'a'})}));
  app.use(morgan('dev'));
  app.use(helmet());

  await app.listen(8080);
}
bootstrap();
