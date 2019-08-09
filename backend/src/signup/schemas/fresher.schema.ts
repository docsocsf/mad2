import * as Mongoose from 'mongoose';

export const FresherSchema = new Mongoose.Schema({
  student: {
    firstName: String,
    lastName: String,
    preferredName: String,
    shortcode: {
      type: String,
      unique: true,
    },
  },
  interests: Mongoose.Schema.Types.Mixed,
  selfDescription: String,
});
