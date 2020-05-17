export class LoginRequest {
  username: string;
  password: string;

  fromForm(request: any) {
    this.username = request.username;
    this.password = request.password;
  }
}
