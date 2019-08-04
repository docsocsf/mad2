import { Document } from 'mongoose';

export interface Fresher extends Document {
  readonly firstName: String;
  readonly lastName: String;
  // shortcode: String,
  // readonly interests: any;
  readonly description: String;
}
