import * as Mongoose from 'mongoose';

export const InterestsSchema = new Mongoose.Schema({
  alcohol: Number,
  clubbing: Number,
  anime: Number,
  sports: Number,
  cooking: Number,
  performingMusic: Number,
  kpop: Number,
  dance: Number,
});
