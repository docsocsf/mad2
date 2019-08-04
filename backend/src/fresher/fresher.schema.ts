import * as mongoose from 'mongoose';
import { any } from 'prop-types';

export const FresherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  // shortcode: String,
  // interests: any,
  description: String,
});
