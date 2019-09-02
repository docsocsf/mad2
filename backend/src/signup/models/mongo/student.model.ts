import { prop, Typegoose } from 'typegoose';

type Gender = 'Male' | 'Female' | 'Other' | 'NA';
type Course = 'JMC' | 'Computing';

export class Student extends Typegoose {

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop()
  preferredName: string;

  @prop({required: true})
  gender: Gender;

  @prop({required: true})
  course: Course;

  @prop({ unique: true, required: true})
  shortcode: string;

  @prop({required: false})
  socialMedia: string;

}
