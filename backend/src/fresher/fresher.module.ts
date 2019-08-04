import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FresherController } from './fresher.controller';
import { FresherService } from './fresher.service';
import { FresherSchema } from './fresher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Fresher', schema: FresherSchema }]),
  ],
  controllers: [FresherController],
  providers: [FresherService],
})
export class FresherModule {}
