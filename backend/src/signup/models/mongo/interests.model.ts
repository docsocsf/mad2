import { prop, Typegoose } from 'typegoose';

export class Interests extends Typegoose {

  @prop({ min: 0, max: 5 })
  alcohol: number;

  @prop({ min: 0, max: 5 })
  clubbing: number;

  @prop({ min: 0, max: 5 })
  anime: number;

  @prop({ min: 0, max: 5 })
  sports: number;

  @prop({ min: 0, max: 5 })
  cooking: number;

  @prop({ min: 0, max: 5 })
  performingMusic: number;

  @prop({ min: 0, max: 5 })
  kpop: number;

  @prop({ min: 0, max: 5 })
  dance: number;

}
