import { Module } from '@nestjs/common';
import { FresherModule } from './fresher/fresher.module';

@Module({
  imports: [FresherModule],
})
export class ApplicationModule {}
