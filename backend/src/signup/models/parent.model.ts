import { prop, Typegoose } from 'typegoose';
import { Student } from './student.model';
import { Interests } from './interests.model';

export class Parent extends Typegoose {
  @prop({ required: true, unique: true })
  student: Student;

  interests: Interests;

  @prop({ required: true })
  partnerShortcode: string;

  @prop()
  selfDescription: string;

  @prop()
  signedUpTs: Date;
}
