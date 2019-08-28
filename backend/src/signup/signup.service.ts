import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { Fresher } from './models/mongo/fresher.model';
import { Parent } from './models/mongo/parent.model';
import { Marriage } from './models/mongo/marriage.model';
import {ParentStatus} from './models/dto/responses/parentStatus.model';

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

  async createParent(createParentDto: Parent): Promise<void> {
    createParentDto.signedUpTs = new Date();
    const createdParent = new this.parentModel(createParentDto);
    await createdParent.save();
    return;
  }

  private async getParentFromShortcode(shortcode: string): Promise<Parent> {
    return await this.parentModel.findOne({
      student: {
        shortcode,
      },
    });
  }

  async propose(shortcode: string, partnerShortcode: string): Promise<Marriage> {
    const me: Parent = await this.getParentFromShortcode(shortcode);

    const partner: Parent = await this.getParentFromShortcode(partnerShortcode);

    if (partner === null) {
      throw new Error('Partner with shortcode '
        + partnerShortcode + ' must be registered first!');
    }

    const existingProposal = this.marriageModel.findOne({
      proposerId: partner,
      proposeeId: me,
    });

    if (existingProposal !== null) {
      existingProposal.accepted = true;
      existingProposal.acceptedTs = new Date();
      return await existingProposal.save();
    } else {

    const proposal = new this.marriageModel({
      proposerId: me,
      proposeeId: partner,
      accepted: false,
      proposeTs: new Date(),
    });

    return await proposal.save();
    }

  }

  async findAllMarriages(): Promise<Marriage[]> {
    return await this.marriageModel.find().populate(['proposer', 'parents', 'proposee']).exec();
  }

  async parentStatus(shortcode: string): Promise<ParentStatus> {
    const me: Parent = await this.getParentFromShortcode(shortcode);

    if (me === null) {
      return new ParentStatus(false, [], []);
    } else {
      return new ParentStatus(
        true,
        await this.proposalsFromSelf(me),
        await this.proposalsToSelf(me),
      );
    }
  }

  private async proposalsToSelf(me: Parent): Promise<Marriage[]> {
    return await this.marriageModel.find({
      proposerId: me,
    });
  }

  private async proposalsFromSelf(me: Parent): Promise<Marriage[]> {
    return await this.marriageModel.find({
      proposeeId: me,
    });
  }

}
