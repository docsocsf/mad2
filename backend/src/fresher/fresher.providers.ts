import { Connection } from 'mongoose';
import { FresherSchema } from './schemas/fresher.schema';

export const fresherProviders = [
  {
    provide: 'FRESHER_MODEL',
    useFactory: (connection: Connection) => connection.model('Fresher', FresherSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
