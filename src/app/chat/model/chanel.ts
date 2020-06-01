export class Chanel {
  name: string;
  messageOwner: number;
  messageReceiver: number;
  photo: string;
  matchContactId: number;


  constructor(name: string, messageOwner: number, messageReceiver: number, photo: string, matchContactId: number) {
    this.name = name;
    this.messageOwner = messageOwner;
    this.messageReceiver = messageReceiver;
    this.photo = photo;
    this.matchContactId = matchContactId;
  }
}
