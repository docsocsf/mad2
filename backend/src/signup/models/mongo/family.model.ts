import { Typegoose, arrayProp, Ref, prop} from 'typegoose';
import {Marriage} from './marriage.model';
import {Fresher} from './fresher.model';

export class Family extends Typegoose {

  @prop({required: true, ref: Marriage})
  parents: Ref<Marriage>;

  @arrayProp({itemsRef: {name: 'Fresher'}})
  kids: Ref<Fresher>[];

  @prop()
  assignedTs: Date;

  @prop({default: false})
  hasFemale: boolean;

  @prop({default: false})
  hasJmc: boolean;
}
