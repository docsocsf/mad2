import { Typegoose, arrayProp, Ref, prop} from 'typegoose';
import { Parent } from 'src/signup/models/parent.model';

export class Marriage extends Typegoose {

  @arrayProp({ required: true, unique: true, itemsRef: Parent})
  parents: Array<Ref<Parent>>;

  @prop({required: true, ref: Parent})
  proposer: Ref<Parent>;

  @prop({required: true, ref: Parent})
  proposee: Ref<Parent>;

  @prop({default: false})
  accepted: boolean;

  @prop()
  proposeTs: Date;

  @prop()
  acceptedTs: Date;
}
