import { Module } from '@nestjs/common';
import { FresherController } from './fresher.controller';
import { FresherService } from './fresher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FresherSchema } from './schemas/fresher.schema';

@Module({
  imports: [MongooseModule.forFeature(([{
    name: 'FRESHER_MODEL',
    schema: FresherSchema,
  }]))],
  controllers: [FresherController],
  providers: [FresherService],
})
export class FresherModule {}
