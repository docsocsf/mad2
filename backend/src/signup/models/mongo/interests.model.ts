import { prop, Typegoose } from 'typegoose';

export class Interests extends Typegoose {

  @prop({ min: 0, max: 5 })
  alcohol: number;

  @prop({ min: 0, max: 5 })
  anime: number;

  @prop({ min: 0, max: 5 })
  artGraphics: number;

  @prop({ min: 0, max: 5 })
  baking: number;

  @prop({ min: 0, max: 5 })
  charity: number;

  @prop({ min: 0, max: 5 })
  clubbing: number;

  @prop({ min: 0, max: 5 })
  cooking: number;

  @prop({ min: 0, max: 5 })
  danceBallroom: number;

  @prop({ min: 0, max: 5 })
  danceContemporary: number;

  @prop({ min: 0, max: 5 })
  dramatics: number;

  @prop({ min: 0, max: 5 })
  exerciseAndHealth: number;

  @prop({ min: 0, max: 5 })
  film: number;

  @prop({ min: 0, max: 5 })
  finance: number;

  @prop({ min: 0, max: 5 })
  football: number;

  @prop({ min: 0, max: 5 })
  hiking: number;

  @prop({ min: 0, max: 5 })
  kpop: number;

  @prop({ min: 0, max: 5 })
  martialArts: number;

  @prop({ min: 0, max: 5 })
  otherSports: number;

  @prop({ min: 0, max: 5 })
  performingMusicClassical: number;

  @prop({ min: 0, max: 5 })
  performingMusicPopRockJazz: number;

  @prop({ min: 0, max: 5 })
  photography: number;

  @prop({ min: 0, max: 5 })
  politics: number;

  @prop({ min: 0, max: 5 })
  racketSports: number;

  @prop({ min: 0, max: 5 })
  rowing: number;

  @prop({ min: 0, max: 5 })
  rugby: number;

  @prop({ min: 0, max: 5 })
  tabletopGames: number;

  @prop({ min: 0, max: 5 })
  videoGames: number;

}
