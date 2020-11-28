export class LoginRequest {
  username: string;
  password: string;
  userType: UserType;
}

export enum UserType {
  ROLE_ADMIN, ROLE_STUDENT, ROLE_COMPANY
}
