import { Marriage } from '../../mongo/marriage.model';
import { Parent } from '../../mongo/parent.model';

interface Proposals {
  readonly to: Marriage[];
  readonly from: Marriage[];
}

export class ParentStatus {

  readonly signedUp: boolean;
  readonly me: Parent;
  readonly proposals: Proposals;

  constructor(me: Parent, signedUp: boolean, from: Marriage[], to: Marriage[]) {
    this.me = me;
    this.signedUp = signedUp;
    this.proposals = {
      to,
      from,
    };
  }

}
