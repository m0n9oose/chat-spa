import { Component }      from '@angular/core';
import { OnInit }         from '@angular/core';
import { ViewChild }      from '@angular/core';

import { Chat }           from '../_models/chat';
import { Message }        from '../_models/message';
import { User }           from '../_models/user';
import { ChatService }    from '../_services/chat.service';
import { WsService }      from '../_services/ws.service';
import { ChatComponent }  from '../chat/chat.component'

@Component({
  selector: 'main',
  templateUrl: 'chats-list.component.html',
  styleUrls: ['chats-list.component.css']
})

export class ChatsListComponent implements OnInit {
  @ViewChild(ChatComponent)
  private chatComponent: ChatComponent;
  chats: Chat[] = [];
  activeChat: Chat;

  constructor(
    private chatService: ChatService,
    private wsService: WsService
  ) {}

  ngOnInit() {
    this.loadAllChats();
    this.listenMessages();
  }

  select(chat: Chat): void {
    this.activeChat = chat;
    this.activeChat.unreadCounter = 0;
  }

  private loadAllChats() {
    this.chatService.list().subscribe(data => {
      for (let chat of data['chats']) { chat.unreadCounter = 0; }
      this.chats = data['chats'];
    });
  }

  private listenMessages() {
    this.wsService.msgStream.subscribe(
      (msg: Message) => {
        // route new message
        // to increment unread counter for inactive chat
        // or add message to thread for active
        if (msg.chat_id !== this.activeChat.id) {
          let chat = this.chats.filter(chat => chat.id === msg.chat_id)[0]
          chat.unreadCounter += 1
        } else {
          this.chatComponent.incomingMessage(msg);
        }
      }
    );
  }
}
