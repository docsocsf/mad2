export class SignupResponse {
  readonly success: boolean;
  readonly shortcode: string;
  readonly message: string;

  constructor(success: boolean, shortcode: string, message: string) {
    this.success = success;
    this.shortcode = shortcode;
    this.message = message;
  }
}
