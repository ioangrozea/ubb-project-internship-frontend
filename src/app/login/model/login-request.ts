export class LoginRequest {
    username: string;
    password: string;
    userType: UserType;
}

export enum UserType {
    ROLE_ADMIN = 0, ROLE_STUDENT = 1, ROLE_COMPANY = 2
}
