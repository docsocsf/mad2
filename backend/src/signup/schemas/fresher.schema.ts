import * as Mongoose from 'mongoose';

export const FresherSchema = new Mongoose.Schema({
  student: {
    firstName: String,
    lastName: String,
    preferredName: {
      type: String,
      unique: true,
    },
    shortcode: String,
  },
  interests: Mongoose.Schema.Types.Mixed,
  selfDescription: String,
});
