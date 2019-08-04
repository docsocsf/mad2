import { Document } from 'mongoose';

export interface Fresher extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
