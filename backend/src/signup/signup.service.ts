import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { Fresher } from './models/fresher.model';
import { Parent } from './models/parent.model';
import { Marriage } from './models/marriage.model';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel('Fresher') private readonly fresherModel: ModelType<Fresher>,
    @InjectModel('Parent') private readonly parentModel: ModelType<Parent>,
    @InjectModel('Marriage') private readonly marriageModel: ModelType<Marriage>,
  ) {}

  async createFresher(createFresherDto: Fresher): Promise<Fresher> {
    const createdFresher = new this.fresherModel(createFresherDto);
    createdFresher.signedUpTs = new Date();
    return await createdFresher.save();
  }

  async findAllFreshers(): Promise<Fresher[]> {
    return await this.fresherModel.find().exec();
  }

  async createParent(createParentDto: Parent): Promise<void> {
    createParentDto.signedUpTs = new Date();
    const createdParent = new this.parentModel(createParentDto);
    await createdParent.save();

    // If no partner, then don't create a marriage.
    if (createParentDto.partnerShortcode === null) {
      return;
    } else {

      // Check if there are marriage proposals against the current parent
      const proposals: Marriage[] = await this.marriageModel
        .find({
          proposerShortcode: createParentDto.partnerShortcode,
          proposeeShortcode: createParentDto.student.shortcode,
        }).exec();

      if (proposals.length > 0) {
        const acceptedMarriage: Marriage = proposals[0];
        acceptedMarriage.accepted = true;
        acceptedMarriage.proposee = createdParent;
        acceptedMarriage.acceptedTs = new Date();
        acceptedMarriage.parents.push(createdParent);
        new this.marriageModel(acceptedMarriage).save();
        return;
      }

      const newMarriage = new this.marriageModel({
        parents: [createdParent],
        proposer: createdParent,
        proposerShortcode: createParentDto.student.shortcode,
        proposeeShortcode: createParentDto.partnerShortcode,
        proposeTs: new Date(),
      });

      await newMarriage.save();
      return;
    }
  }

  async findAllParents(): Promise<Parent[]> {
    return await this.parentModel.find().exec();
  }

  async findAllMarriages(): Promise<Marriage[]> {
    return await this.marriageModel.find().populate(['proposer', 'parents', 'proposee']).exec();
  }
}
