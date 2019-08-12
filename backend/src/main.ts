import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as morgan from 'morgan';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors();
  app.use(morgan('tiny'));
  app.use(helmet());
  await app.listen(8080);
}
bootstrap();
