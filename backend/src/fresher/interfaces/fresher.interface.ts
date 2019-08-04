import { Document } from 'mongoose';

export interface Fresher extends Document {
  readonly student: {
    firstName: string;
    lastName: string;
    preferredName: string;
    shortcode: string;
  };
  readonly interests: {
    [key: string]: number;
  };
  readonly selfDescription: string;
}
