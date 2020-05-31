import {Component, OnInit} from '@angular/core';
import {ChannelData, Message, StreamChat, User} from 'stream-chat';
import axios from 'axios';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

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

  async joinChat() {
    const {username} = this;
    try {
      const response = await axios.post('ws://51.124.90.72:8765', {
        username,
      });
      const apiKey = response.data.api_key;

      this.chatClient = new StreamChat(apiKey);

      this.currentUser = await this.chatClient.setUser(
        {
          id: username,
          name: username,
        }
      );

      const channel = this.chatClient.channel('team', 'talkshop');
      await channel.watch();
      this.channel = channel;
      this.messages = channel.state.messages;
      this.channel.on('message.new', event => {
        this.messages = [...this.messages, event.message];
      });

      const filter = {
        type: 'team',
        members: {$in: [`${this.currentUser.me.id}`]},
      };
      const sort = {last_message_at: -1};

      this.channelList = await this.chatClient.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
    } catch (err) {
      console.log(err);
      return;
    }
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
    this.myWebSocket.next("1 2");
    console.log("after")
  }

}
