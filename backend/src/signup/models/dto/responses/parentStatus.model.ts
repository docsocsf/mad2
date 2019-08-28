import { Marriage } from '../../mongo/marriage.model';

export class ParentStatus {

  readonly signedUp: boolean;
  readonly from: Marriage[];
  readonly to: Marriage[];

  constructor(signedUp: boolean, from: Marriage[], to: Marriage[]) {
    this.signedUp = signedUp;
    this.from = from;
    this.to = to;
  }

}
