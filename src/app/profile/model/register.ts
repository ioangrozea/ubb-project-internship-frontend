export class AccountRegister {
  username: string;
  password: string;
  retyped_password: string;


  constructor(username: string, password: string, retyped_password: string) {
    this.username = username;
    this.password = password;
    this.retyped_password = retyped_password;
  }
}

export class ProfileRegister {
  user_id: number;
  name: string;
  profile_type: string;


  constructor(name: string, profile_type: string) {
    this.name = name;
    this.profile_type = profile_type;
  }
}
