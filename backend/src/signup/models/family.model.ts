import { Typegoose, arrayProp, Ref, prop} from 'typegoose';
import {Marriage} from 'src/signup/models/marriage.model';
import {Fresher} from 'src/signup/models/fresher.model';

export class Family extends Typegoose {

  @prop({required: true, ref: Marriage})
  parents: Ref<Marriage>;

  @arrayProp({ required: true, unique: true, itemsRef: Fresher})
  kids: Array<Ref<Fresher>>;
}
