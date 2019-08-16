import { SignupResponse } from './signupResponse.model';
type MarriageStatus = 'Accepted' | 'Proposed' | null;

export class ParentResponse extends SignupResponse {

  readonly status: MarriageStatus;
  readonly partnerShortcode!: string;

  constructor(success: boolean, shortcode: string,
              partnerShortcode: string, status: MarriageStatus) {
    super(success, shortcode);
    this.partnerShortcode = partnerShortcode;
    this.status = status;
  }

}
