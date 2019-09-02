import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, InstanceType } from 'typegoose';
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
    @InjectModel('Marriage')
    private readonly marriageModel: ModelType<Marriage>,
    @InjectModel('Family') private readonly familyModel: ModelType<Family>,
  ) {}

  async createFresher(createFresherDto: Fresher): Promise<any> {
    const createdFresher = new this.fresherModel(createFresherDto);
    createdFresher.signedUpTs = new Date();
    const fresher = await createdFresher.save();
    return {
      preferredName: fresher.student.preferredName,
      shortcode: fresher.student.shortcode,
    };
  }

  async verifyFresher(id: string): Promise<void> {
    const fresher: InstanceType<Fresher> = await this.fresherModel.findById(id);
    try {
      if (fresher) {
        fresher.verified = true;
        fresher.save();
        return;
      } else {
        throw new HttpException('Id not found!', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new HttpException('Bad id', HttpStatus.BAD_REQUEST);
    }
  }

  async fresherStatus(id: string): Promise<Fresher> {
    const fresher = await this.fresherModel.findById(id);
    if (fresher) {
      if (fresher.verified) {
        return fresher;
      } else {
        throw new HttpException(
          'You must verify the sign up first',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException('Fresher not found', HttpStatus.BAD_REQUEST);
    }
  }

  async createParent(createParentDto: Parent): Promise<void> {
    createParentDto.signedUpTs = new Date();
    const createdParent = new this.parentModel(createParentDto);
    await createdParent.save();
    return;
  }

  private async getParentFromShortcode(
    shortcode: string,
  ): Promise<InstanceType<Parent>> {
    return await this.parentModel.findOne({
      'student.shortcode': shortcode,
    }).populate({
      path: 'family',
      populate: {
        path: 'parents',
        populate: [
          {path: 'proposerId'},
          {path: 'proposeeId'},
        ],
      },
    });
  }

  async propose(
    shortcode: string,
    partnerShortcode: string,
  ): Promise<Marriage> {
    if (partnerShortcode === shortcode) {
      throw new HttpException(
        "You can't propose to yourself, you dummy",
        HttpStatus.BAD_REQUEST,
      );
    }
    const me: InstanceType<Parent> = await this.getParentFromShortcode(
      shortcode,
    );

    const partner: InstanceType<Parent> = await this.getParentFromShortcode(
      partnerShortcode,
    );

    if (partner === null) {
      throw new HttpException(
        'The partner with shortcode ' +
          partnerShortcode +
          ` has not signed up yet. Please ask them to sign up and then try again.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingProposalFromPartner = await this.marriageModel
      .findOne({
        proposerId: partner,
        proposeeId: me,
      })
      .exec();

    if (existingProposalFromPartner !== null) {
      existingProposalFromPartner.accepted = true;
      existingProposalFromPartner.acceptedTs = new Date();
      let newFamily = new this.familyModel({
        parents: existingProposalFromPartner,
      });
      newFamily = await newFamily.save();
      partner.family = newFamily._id;
      me.family = newFamily._id;
      await me.save();
      await partner.save();
      return await existingProposalFromPartner.save();
    } else {
      const existingProposalFromMe = await this.marriageModel
        .findOne({
          proposerId: me,
          proposeeId: partner,
        })
        .exec();

      if (existingProposalFromMe != null) {
        throw new HttpException(
          'You have already proposed to ' + partnerShortcode,
          HttpStatus.BAD_REQUEST,
        );
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
    return await this.marriageModel
      .find()
      .populate(['proposer', 'parents', 'proposee'])
      .exec();
  }

  async parentStatus(shortcode: string): Promise<ParentStatus> {
    const me: Parent = await this.getParentFromShortcode(shortcode);

    if (me === null) {
      return new ParentStatus(me, false, [], []);
    } else if (me.family) {
      return new ParentStatus(me, true, [], []);
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
    return await this.marriageModel
      .find({
        proposerId: me,
      })
      .populate(['proposerId', 'proposeeId'])
      .exec();
  }

  private async proposalsFromSelf(me: Parent): Promise<Marriage[]> {
    return await this.marriageModel
      .find({
        proposeeId: me,
      })
      .populate(['proposerId', 'proposeeId'])
      .exec();
  }
}
