import { prop, Typegoose } from 'typegoose';

export class Interests extends Typegoose {

  @prop({ min: 0, max: 3, default: 0 })
  alcohol: number;

  @prop({ min: 0, max: 3, default: 0 })
  anime: number;

  @prop({ min: 0, max: 3, default: 0 })
  artGraphics: number;

  @prop({ min: 0, max: 3, default: 0 })
  baking: number;

  @prop({ min: 0, max: 3, default: 0 })
  charity: number;

  @prop({ min: 0, max: 3, default: 0 })
  clubbing: number;

  @prop({ min: 0, max: 3, default: 0 })
  cooking: number;

  @prop({ min: 0, max: 3, default: 0 })
  danceBallroom: number;

  @prop({ min: 0, max: 3, default: 0 })
  danceContemporary: number;

  @prop({ min: 0, max: 3, default: 0 })
  dramatics: number;

  @prop({ min: 0, max: 3, default: 0 })
  exerciseAndHealth: number;

  @prop({ min: 0, max: 3, default: 0 })
  film: number;

  @prop({ min: 0, max: 3, default: 0 })
  finance: number;

  @prop({ min: 0, max: 3, default: 0 })
  football: number;

  @prop({ min: 0, max: 3, default: 0 })
  hiking: number;

  @prop({ min: 0, max: 3, default: 0 })
  kpop: number;

  @prop({ min: 0, max: 3, default: 0 })
  martialArts: number;

  @prop({ min: 0, max: 3, default: 0 })
  otherSports: number;

  @prop({ min: 0, max: 3, default: 0 })
  performingMusicClassical: number;

  @prop({ min: 0, max: 3, default: 0 })
  performingMusicPopRockJazz: number;

  @prop({ min: 0, max: 3, default: 0 })
  photography: number;

  @prop({ min: 0, max: 3, default: 0 })
  politics: number;

  @prop({ min: 0, max: 3, default: 0 })
  racketSports: number;

  @prop({ min: 0, max: 3, default: 0 })
  rowing: number;

  @prop({ min: 0, max: 3, default: 0 })
  rugby: number;

  @prop({ min: 0, max: 3, default: 0 })
  tabletopGames: number;

  @prop({ min: 0, max: 3, default: 0 })
  videoGames: number;

}
