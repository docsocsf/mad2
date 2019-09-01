import { prop, Typegoose} from 'typegoose';
import { Student } from './student.model';
import { Interests } from './interests.model';

export class Parent extends Typegoose {

  @prop({ required: true, unique: true })
  student: Student;

  @prop({ required: true})
  interests: Interests;

  @prop()
  selfDescription: string;

  @prop()
  signedUpTs: Date;

  @prop({default: false})
  married: boolean;
}
