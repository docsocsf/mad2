import { prop, Typegoose } from 'typegoose';
import {Student} from 'src/signup/models/student.model';
import {Interests} from 'src/signup/models/interests.model';

export class Fresher extends Typegoose {

  @prop({ required: true, unique: true })
  student: Student;

  @prop({ required: true })
  interests: Interests;

  @prop()
  selfDescription: string;
}
