import { Module } from '@nestjs/common';
import { FresherModule } from './fresher/fresher.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FresherModule, 
    MongooseModule.forRoot(
      'mongodb://localhost/demo'
    )],
})
export class ApplicationModule {}
