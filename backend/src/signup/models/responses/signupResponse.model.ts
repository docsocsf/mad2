export class SignupResponse {
  readonly success: boolean;
  readonly shortcode: string;

  constructor(success: boolean, shortcode: string) {
    this.success = success;
    this.shortcode = shortcode;
  }
}
