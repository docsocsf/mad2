export class AuthResponse {
  readonly auth: boolean;
  readonly user!: {
    FirstName: string,
    Surname: string,
    CID: string,
    Email: string,
    Login: string,
    OrderNo: number,
    MemberType: string,
    title: string,
    DoB: string,
    Gender: string
  };
}
