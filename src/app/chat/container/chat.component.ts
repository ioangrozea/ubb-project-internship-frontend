import {Component, OnDestroy, OnInit} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {AuthenticationService} from "../../login/service";
import {ProfileApiService} from "../../profile/http";
import {ChatService} from "../service";
import {Chanel} from "../model/chanel";
import {ChatApiService} from "../http";
import {Message} from "../model/message";
import {MessageToSend} from "../model/message_to_send";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  channel: Chanel;
  username = '';
  messages: Message[] = [];
  newMessage = '';
  myWebSocket: WebSocketSubject<string>;

  chancels: Chanel[] = []

  constructor(private authenticationService: AuthenticationService,
              private profileApiService: ProfileApiService,
              private chatService: ChatService,
              private chatApiService: ChatApiService) {
  }


  ngOnInit(): void {
    console.log("before")
    if (!this.myWebSocket)
      this.myWebSocket = webSocket('ws://51.124.90.72:8765');
    this.myWebSocket.asObservable().subscribe(dataFromServer => {
      this.loadMessages(this.channel)
    });
    this.myWebSocket.next(this.authenticationService.getAuthenticationData().profileId.toString());
    console.log("after")

    this.initChanel()

    console.log(this.chancels)
  }


  initChanel() {
    this.chatService.getChatContacts(this.authenticationService.getAuthenticationData().profileId).then(
      chanelPromises => chanelPromises.map(chanelPromise => chanelPromise.then(
        chanel => {
          this.channel = chanel;
          return this.chancels.push(chanel);
        }
      ))
    )
  }

  loadMessages(chanel: Chanel) {
    this.channel = chanel;
    this.chatApiService.getChatMessages(chanel.matchContactId).subscribe(messages => this.messages = messages)
  }

  sendMessage() {
    this.chatApiService.sendMessage(new MessageToSend(this.channel.matchContactId, this.newMessage, this.channel.messageOwner, this.channel.messageReceiver))
      .subscribe(message => {
        this.loadMessages(this.channel)
      })

    this.newMessage = "";
  }

  closeConnection() {
    if (this.myWebSocket) {
      this.myWebSocket.complete();
      this.myWebSocket = null;
    }
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }
}
