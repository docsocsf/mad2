import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, InstanceType } from 'typegoose';
import { Fresher } from './models/mongo/fresher.model';
import { Parent } from './models/mongo/parent.model';
import { Marriage } from './models/mongo/marriage.model';
import { Family } from './models/mongo/family.model';
import { ParentStatus } from './models/dto/responses/parentStatus.model';
import { MailerService } from '@nest-modules/mailer';

import * as fs from 'fs';

@Injectable()
export class SignupService {

  private confirmationHtml: string;
  private parentAllocationHtml: string;
  private fresherAllocationHtml: string;

  constructor(
    @InjectModel('Fresher') private readonly fresherModel: ModelType<Fresher>,
    @InjectModel('Parent') private readonly parentModel: ModelType<Parent>,
    @InjectModel('Marriage')
    private readonly marriageModel: ModelType<Marriage>,
    @InjectModel('Family') private readonly familyModel: ModelType<Family>,
    private readonly mailerService: MailerService,
  ) {
    this.confirmationHtml =
      fs.readFileSync('./emails/confirmation.html').toString();
    this.parentAllocationHtml =
      fs.readFileSync('./emails/parentAllocation.html').toString();
    this.fresherAllocationHtml =
      fs.readFileSync('./emails/fresherAllocation.html').toString();
  }

  async createFresher(createFresherDto: Fresher): Promise<any> {
    const createdFresher = new this.fresherModel(createFresherDto);
    createdFresher.signedUpTs = new Date();
    const fresher = await createdFresher.save();
    this.mailerService.sendMail({
      from: 'docsoc@ic.ac.uk',
      to: fresher.student.shortcode + '@ic.ac.uk',
      subject: 'Mums and Dads Signup Verification!',
      html: this.confirmationHtml.replace('FRESHER_UUID_HERE', fresher._id),
    });
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
    const fresher = await this.getFresherFromId(id);
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

  private async getFresherFromId(
    id: string,
  ): Promise<InstanceType<Fresher>> {
    return await this.fresherModel.findById(id)
    .populate([
      {
        path: 'family',
        model: Family,
        populate: [{
          path: 'parents',
          model: Marriage,
          populate: [
            {path: 'proposerId', model: Parent },
            {path: 'proposeeId', model: Parent },
          ],
        },
          {
            path: 'kids',
            model: Fresher,
          },
        ],
      },
    ],
    );
  }

  private async getParentFromShortcode(
    shortcode: string,
  ): Promise<InstanceType<Parent>> {
    return await this.parentModel.findOne({
      'student.shortcode': shortcode,
    })
    .populate([
      {
        path: 'family',
        model: Family,
        populate: [
          {
            path: 'parents',
            model: Marriage,
            populate: [
              {path: 'proposerId', model: Parent },
              {path: 'proposeeId', model: Parent },
            ],
          },
          {
            path: 'kids',
            model: Fresher,
          },
        ],
      },
    ]);
  }

  async propose(
    shortcode: string,
    partnerShortcode: string,
  ): Promise<Marriage> {
    if (partnerShortcode === shortcode) {
      throw new HttpException(
        'You can\'t propose to yourself, you dummy',
        HttpStatus.BAD_REQUEST,
      );
    }
    const me: InstanceType<Parent> = await this.getParentFromShortcode(
      shortcode,
    );

    if (me === null) {
      throw new HttpException(
        'You need to sign up first!',
        HttpStatus.BAD_REQUEST,
      );
    } else if (me.family) {
      throw new HttpException(
        'You\'re already married!',
        HttpStatus.BAD_REQUEST,
      );
    }

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
    } else if (partner.family) {
      throw new HttpException(
        partnerShortcode + ' is already married!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingProposalFromPartner = await this.marriageModel
      .findOne({
        proposerId: partner._id,
        proposeeId: me._id,
      });

    if (existingProposalFromPartner !== null) {
      existingProposalFromPartner.accepted = true;
      existingProposalFromPartner.acceptedTs = new Date();
      let newFamily = new this.familyModel({
        parents: existingProposalFromPartner,
        hasFemale: me.student.gender === 'Female' || partner.student.gender === 'Female',
        hasJmc: me.student.course === 'JMC' || partner.student.course === 'JMC',
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
          proposerId: me._id,
          proposeeId: partner._id,
        })
        .exec();

      if (existingProposalFromMe != null) {
        throw new HttpException(
          'You have already proposed to ' + partnerShortcode,
          HttpStatus.BAD_REQUEST,
        );
      }

      const proposal = new this.marriageModel({
        proposerId: me._id,
        proposeeId: partner._id,
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

  async allFamilies(): Promise<Family[]> {
    return await this.familyModel
    .find()
    .populate([
      {
        path: 'parents',
        model: Marriage,
        populate: [
          {path: 'proposerId', model: Parent },
          {path: 'proposeeId', model: Parent },
        ],
      },
      {
        path: 'kids',
          model: Fresher,
      },
    ]);
  }

  async allUnallocatedKids(): Promise<Fresher[]> {
    return await this.fresherModel.find({family: null, verified: true});
  }

  async parentStatus(shortcode: string): Promise<ParentStatus> {
    const me: InstanceType<Parent> = await this.getParentFromShortcode(shortcode);

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

  private async proposalsToSelf(me: InstanceType<Parent>): Promise<Marriage[]> {
    return await this.marriageModel
      .find({
        proposerId: me._id,
      })
      .populate([
        { path: 'proposerId', model: Parent },
        { path: 'proposeeId', model: Parent },
      ])
      .exec();
  }

  private async proposalsFromSelf(me: InstanceType<Parent>): Promise<Marriage[]> {
    return await this.marriageModel
      .find({
        proposeeId: me._id,
      })
      .populate([
        { path: 'proposerId', model: Parent },
        { path: 'proposeeId', model: Parent },
      ])
      .exec();
  }

  async allocate(allocations: any[]): Promise<void> {
    const toSave = allocations.map(
      alloc => this.saveAllocation(alloc.fresher, alloc.family),
    );

    const allocatedPairs: any = await Promise.all(toSave);

    const allocatedFamilies: Set<any> = new Set(allocatedPairs.map(
      pair => pair.family,
    ));

    await Promise.all([...allocatedFamilies].flatMap(f => {
      return [
        this.notifyParentAllocation(f.parents.proposerId),
        this.notifyParentAllocation(f.parents.proposeeId),
      ];
    }));

    const allocatedFreshers: Set<InstanceType<Fresher>> = new Set(allocatedPairs.map(
      pair => pair.fresher,
    ));

    await Promise.all([...allocatedFreshers].map(
      f => this.notifyFresherAllocation(f),
    ));

  }

  private async saveAllocation(fresherId: any, familyId: any): Promise<any> {
    const fresher: InstanceType<Fresher>
    = await this.getFresherFromId(fresherId);
    if (fresher.family) {
      throw new HttpException(
        'That fresher has already been assigned',
        HttpStatus.BAD_REQUEST,
      );
    }
    const family =
      await this.familyModel.findById(familyId)
      .populate([
        {
          path: 'parents',
          model: Marriage,
          populate: [
            {path: 'proposerId', model: Parent },
            {path: 'proposeeId', model: Parent },
          ],
        },
        {
          path: 'kids',
          model: Fresher,
        },
      ]);

    if (family === null) {
      throw new HttpException(
        'Family does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    fresher.family = familyId;
    family.kids.push(fresherId);

    fresher.save();
    family.save();

    return {fresher, family};
  }

  private async notifyParentAllocation(parent: Parent): Promise<any> {
    return this.mailerService.sendMail({
      from: 'docsoc@ic.ac.uk',
      to: parent.student.shortcode + '@ic.ac.uk',
      subject: 'Mums and Dads Family Allocation',
      html: this.parentAllocationHtml,
    });
  }

  private async notifyFresherAllocation(fresher: InstanceType<Fresher>): Promise<any> {
    return this.mailerService.sendMail({
      from: 'docsoc@ic.ac.uk',
      to: fresher.student.shortcode + '@ic.ac.uk',
      subject: 'Mums and Dads Family Allocation',
      html: this.fresherAllocationHtml
        .replace('FRESHER_UUID_HERE', fresher._id),
    });

  }

}
