import { prop, Typegoose } from 'typegoose';

export class Interests extends Typegoose {

  @prop({ min: 0, max: 3 })
  alcohol: number;

  @prop({ min: 0, max: 3 })
  anime: number;

  @prop({ min: 0, max: 3 })
  artGraphics: number;

  @prop({ min: 0, max: 3 })
  baking: number;

  @prop({ min: 0, max: 3 })
  charity: number;

  @prop({ min: 0, max: 3 })
  clubbing: number;

  @prop({ min: 0, max: 3 })
  cooking: number;

  @prop({ min: 0, max: 3 })
  danceBallroom: number;

  @prop({ min: 0, max: 3 })
  danceContemporary: number;

  @prop({ min: 0, max: 3 })
  dramatics: number;

  @prop({ min: 0, max: 3 })
  exerciseAndHealth: number;

  @prop({ min: 0, max: 3 })
  film: number;

  @prop({ min: 0, max: 3 })
  finance: number;

  @prop({ min: 0, max: 3 })
  football: number;

  @prop({ min: 0, max: 3 })
  hiking: number;

  @prop({ min: 0, max: 3 })
  kpop: number;

  @prop({ min: 0, max: 3 })
  martialArts: number;

  @prop({ min: 0, max: 3 })
  otherSports: number;

  @prop({ min: 0, max: 3 })
  performingMusicClassical: number;

  @prop({ min: 0, max: 3 })
  performingMusicPopRockJazz: number;

  @prop({ min: 0, max: 3 })
  photography: number;

  @prop({ min: 0, max: 3 })
  politics: number;

  @prop({ min: 0, max: 3 })
  racketSports: number;

  @prop({ min: 0, max: 3 })
  rowing: number;

  @prop({ min: 0, max: 3 })
  rugby: number;

  @prop({ min: 0, max: 3 })
  tabletopGames: number;

  @prop({ min: 0, max: 3 })
  videoGames: number;

}
