import { Module } from '@nestjs/common';
// import { AppController } from './fresher/fresher.controller';
// import { FresherService } from './fresher/fresher.service';
// import { MongooseModule } from '@nestjs/mongoose';
import { FresherModule } from './fresher/fresher.module';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/demo')],
  // controllers: [AppController],
  // providers: [FresherService],
  imports: [FresherModule],
})
export class AppModule {}
