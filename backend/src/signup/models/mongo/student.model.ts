import { prop, Typegoose } from 'typegoose';

export class Student extends Typegoose {

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop()
  preferredName: string;

  @prop({ unique: true, required: true})
  shortcode: string;

  @prop({required: false})
  socialMedia: string;

}
