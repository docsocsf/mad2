import { Marriage } from '../mongo/marriage.model';

export class ProposalsResponse {
  readonly from: Marriage[];
  readonly to: Marriage[];

  constructor(from: Marriage[], to: Marriage[]) {
    this.from = from;
    this.to = to;
  }

}
