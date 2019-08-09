import { prop, Typegoose } from 'typegoose';

export class Student extends Typegoose {

  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop()
  preferredName: string;

  @prop({ unique: true })
  shortcode: string;

}
