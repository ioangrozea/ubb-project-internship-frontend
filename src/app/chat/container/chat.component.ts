import {Component, OnInit} from '@angular/core';
import {ChannelData, Message, User} from 'stream-chat';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {AuthenticationService} from "../../login/service";
import {ChatApiService} from "../http";
import {Match} from "../../match/model/match";
import {ProfileApiService} from "../../profile/http";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  channel: ChannelData;
  username = '';
  messages: Message[] = [];
  newMessage = '';
  channelList: ChannelData[];
  chatClient: any;
  currentUser: User;
  myWebSocket: WebSocketSubject<string>;


  matches: Match[];

  constructor(private authenticationService: AuthenticationService,
              private chatApiService: ChatApiService,
              private profileApiService: ProfileApiService) {
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    try {
      await this.channel.sendMessage({
        text: this.newMessage,
      });
      this.newMessage = '';
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit(): void {
    console.log("before")
    if (!this.myWebSocket)
      this.myWebSocket = webSocket('ws://51.124.90.72:8765');
    this.myWebSocket.asObservable().subscribe(dataFromServer => {
      console.log("message received from websocketserver")
      console.log(dataFromServer)
    });
    this.myWebSocket.next(this.authenticationService.getAuthenticationData().profileId.toString());
    console.log("after")
  }

  initChanel() {
    this.chatApiService.getChancels(this.authenticationService.getAuthenticationData().profileId).subscribe(matches => {
      if (matches) {
        this.matches = matches;
      }
    })
  }

  mapChat(match: Match) {
    this.profileApiService.getProfilePhotos(match.SecondProfileId)
  }
}
