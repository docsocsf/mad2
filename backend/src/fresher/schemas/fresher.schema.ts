import * as mongoose from 'mongoose';

export const FresherSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});
