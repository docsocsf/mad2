import { prop, Typegoose, Ref } from 'typegoose';
import { Student } from './student.model';
import { Interests } from './interests.model';
import { Family } from './family.model';

export class Fresher extends Typegoose {

  @prop({ required: true, unique: true })
  student: Student;

  @prop({ required: true })
  interests: Interests;

  @prop()
  selfDescription: string;

  @prop()
  signedUpTs: Date;

  @prop({ required: true, default: false })
  verified: boolean;
}
