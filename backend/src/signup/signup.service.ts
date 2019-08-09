import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { Fresher } from './models/fresher.model';

@Injectable()
export class SignupService {
  constructor(@InjectModel('Fresher') private readonly fresherModel: ModelType<Fresher>) {}

  async create(createFresherDto: Fresher): Promise<Fresher> {
    const createdFresher = new this.fresherModel(createFresherDto);
    return await createdFresher.save();
  }

  async findAll(): Promise<Fresher[]> {
    return await this.fresherModel.find().exec();
  }
}
