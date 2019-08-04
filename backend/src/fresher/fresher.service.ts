import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Fresher } from './fresher.interface';
import { CreateFresherDto } from './create-fresher.dto';

@Injectable()
export class FresherService {
  constructor(
    @InjectModel('Fresher') private readonly catModel: Model<Fresher>,
  ) {}

  async create(createCatDto: CreateFresherDto): Promise<Fresher> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Fresher[]> {
    return await this.catModel.find().exec();
  }
}
