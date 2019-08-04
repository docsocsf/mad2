import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFresherDto } from './dto/create-fresher.dto';
import { Fresher } from './interfaces/fresher.interface';

@Injectable()
export class FresherService {
  constructor(@InjectModel('FRESHER_MODEL') private readonly fresherModel: Model<Fresher>) {}

  async create(createFresherDto: CreateFresherDto): Promise<Fresher> {
    const createdFresher = new this.fresherModel(createFresherDto);
    return await createdFresher.save();
  }

  async findAll(): Promise<Fresher[]> {
    return await this.fresherModel.find().exec();
  }
}
