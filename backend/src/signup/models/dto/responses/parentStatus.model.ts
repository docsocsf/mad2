import { Marriage } from '../../mongo/marriage.model';
import { Parent } from '../../mongo/parent.model';
import { Family } from '../../mongo/family.model';

interface Proposals {
  readonly to: Marriage[];
  readonly from: Marriage[];
}

export class ParentStatus {

  readonly signedUp: boolean;
  readonly me: Parent;
  readonly proposals: Proposals;
  readonly myFamily: Family;

  constructor(
    me: Parent,
    signedUp: boolean,
    from: Marriage[],
    to: Marriage[],
    myFamily: Family,
  ) {
    this.me = me;
    this.signedUp = signedUp;
    this.proposals = { to, from };
    this.myFamily = myFamily;
  }

}
