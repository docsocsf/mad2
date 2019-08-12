import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { Fresher } from './models/fresher.model';
import { Parent } from './models/parent.model';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel('Fresher') private readonly fresherModel: ModelType<Fresher>,
    @InjectModel('Parent') private readonly parentModel: ModelType<Parent>,
  ) {}

  async createFresher(createFresherDto: Fresher): Promise<Fresher> {
    const createdFresher = new this.fresherModel(createFresherDto);
    createdFresher.signedUpTs = new Date();
    return await createdFresher.save();
  }

  async findAllFreshers(): Promise<Fresher[]> {
    return await this.fresherModel.find().exec();
  }

  async createParent(createParentDto: Parent): Promise<Parent> {
    createParentDto.signedUpTs = new Date();
    const createdParent = new this.parentModel(createParentDto);
    return await createdParent.save();
  }

  async findAllParents(): Promise<Parent[]> {
    return await this.parentModel.find().exec();
  }
}
