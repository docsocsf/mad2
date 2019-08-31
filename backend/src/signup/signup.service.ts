import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { Fresher } from './models/mongo/fresher.model';
import { Parent } from './models/mongo/parent.model';
import { Marriage } from './models/mongo/marriage.model';
import { Family } from './models/mongo/family.model';
import { ParentStatus } from './models/dto/responses/parentStatus.model';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel('Fresher') private readonly fresherModel: ModelType<Fresher>,
    @InjectModel('Parent') private readonly parentModel: ModelType<Parent>,
    @InjectModel('Marriage') private readonly marriageModel: ModelType<Marriage>,
    @InjectModel('Family') private readonly familyModel: ModelType<Family>,
  ) {}

  async createFresher(createFresherDto: Fresher): Promise<any> {
    const createdFresher = new this.fresherModel(createFresherDto);
    createdFresher.signedUpTs = new Date();
    const fresher = await createdFresher.save();
    return {
      preferredName: fresher.preferredName,
      shortcode: fresher.shortcode,
    };
  }

  async createParent(createParentDto: Parent): Promise<void> {
    createParentDto.signedUpTs = new Date();
    const createdParent = new this.parentModel(createParentDto);
    await createdParent.save();
    return;
  }

  private async getParentFromShortcode(shortcode: string): Promise<any> {
    return await this.parentModel.findOne({
      'student.shortcode' : shortcode,
    });
  }

  async propose(shortcode: string, partnerShortcode: string): Promise<Marriage> {

    if (partnerShortcode === shortcode) {
      throw new HttpException(
        'You can\'t propose to yourself, you dummy',
        HttpStatus.BAD_REQUEST,
      );
    }
    const me = await this.getParentFromShortcode(shortcode);

    const partner = await this.getParentFromShortcode(partnerShortcode);

    if (partner === null) {
      throw new HttpException(
        'The partner with shortcode '
        + partnerShortcode +
        ` has not signed up yet. Please ask them to sign up and then try again.`, HttpStatus.BAD_REQUEST);
    }

    const existingProposalFromPartner = await this.marriageModel.findOne({
      proposerId: partner,
      proposeeId: me,
    }).exec();

    if (existingProposalFromPartner !== null) {
      existingProposalFromPartner.accepted = true;
      existingProposalFromPartner.acceptedTs = new Date();
      const newFamily = new this.familyModel({
        parents: existingProposalFromPartner,
      });
      partner.family = newFamily;
      me.family =  newFamily;
      newFamily.save();
      me.save();
      partner.save();
      return await existingProposalFromPartner.save();
    } else {

      const existingProposalFromMe = await this.marriageModel.findOne({
        proposerId: me,
        proposeeId: partner,
      }).exec();

      if (existingProposalFromMe != null) {
        throw new HttpException('You have already proposed to ' + partnerShortcode, HttpStatus.BAD_REQUEST);
      }

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
      return new ParentStatus(me, false, [], []);
    } else if (me.family !== null) {
      return new ParentStatus(
        me,
        true,
        [],
        [],
      );
    } else {
      return new ParentStatus(
        me,
        true,
        await this.proposalsToSelf(me),
        await this.proposalsFromSelf(me),
      );
    }
  }

  private async proposalsToSelf(me: Parent): Promise<Marriage[]> {
    return await this.marriageModel.find({
      proposerId: me,
    }).populate(['proposerId', 'proposeeId']).exec();
  }

  private async proposalsFromSelf(me: Parent): Promise<Marriage[]> {
    return await this.marriageModel.find({
      proposeeId: me,
    }).populate(['proposerId', 'proposeeId']).exec();
  }

}
