export class MessageToSend{
  matched_contact_id: number;
  message_text: string;
  message_owner: number;
  message_receiver: number;


  constructor(matched_contact_id: number, message_text: string, message_owner: number, message_receiver: number) {
    this.matched_contact_id = matched_contact_id;
    this.message_text = message_text;
    this.message_owner = message_owner;
    this.message_receiver = message_receiver;
  }
}
