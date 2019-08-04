import { Module } from '@nestjs/common';
import { FresherController } from './fresher.controller';
import { FresherService } from './fresher.service';
import { fresherProviders } from './fresher.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FresherController],
  providers: [FresherService, ...fresherProviders],
})
export class FresherModule {}
