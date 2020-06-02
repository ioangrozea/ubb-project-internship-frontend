export class UserOption{
  profileId: number;
  text: string;
  id: number;

  constructor(text: string, profileId: number) {
    this.text = text;
    this.profileId = profileId;
  }
}
