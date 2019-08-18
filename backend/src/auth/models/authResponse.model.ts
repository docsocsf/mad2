export class AuthResponse {
  readonly auth: boolean;
  readonly member: boolean;
  readonly data!: {
    FirstName: string,
    LastName: string,
    CID: string,
    Email: string,
    Login: string,
    OrderNo: number,
    MemberType: string,
  };
}
