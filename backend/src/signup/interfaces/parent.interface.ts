import { Document } from 'mongoose';

export interface Parent extends Document {
  readonly student: {
    firstName: string;
    lastName: string;
    preferredName: string;
    shortcode: string;
  };
  readonly partnerShortcode: string;
  readonly interests: {
    [key: string]: number;
  };
  readonly selfDescription: string;
}
