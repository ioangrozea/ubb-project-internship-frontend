export class Chanel{
  name: string;
  profileId: number;
  photo: string;
  matchContactId: number;


  constructor(name: string, profileId: number, photo: string, matchContactId: number) {
    this.name = name;
    this.profileId = profileId;
    this.photo = photo;
    this.matchContactId = matchContactId;
  }
}
