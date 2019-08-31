import { Typegoose, arrayProp, Ref, prop} from 'typegoose';
import {Marriage} from './marriage.model';
import {Fresher} from './fresher.model';

export class Family extends Typegoose {

  @prop({required: true, ref: Marriage})
  parents: Ref<Marriage>;

  @arrayProp({ required: true, itemsRef: Fresher, default: new Array()})
  kids: Array<Ref<Fresher>>;

  @prop()
  assignedTs: Date;
}
