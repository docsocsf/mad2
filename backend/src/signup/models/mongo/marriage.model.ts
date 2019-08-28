import { Typegoose, Ref, prop} from 'typegoose';
import { Parent } from './parent.model';

export class Marriage extends Typegoose {

  @prop({required: true, ref: Parent})
  proposerId: Ref<Parent>;

  @prop({ref: Parent})
  proposeeId: Ref<Parent>;

  @prop({default: false})
  accepted: boolean;

  @prop()
  proposeTs: Date;

  @prop()
  acceptedTs: Date;
}
