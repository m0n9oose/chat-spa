import { Component, OnInit }  from '@angular/core';
import { Chat }               from '../_models/chat';
import { Message }            from '../_models/message';
import { User }               from '../_models/user';
import { ChatService }        from '../_services/chat.service';

@Component({
  selector: 'main',
  templateUrl: 'chats-list.component.html',
  styleUrls: ['chats-list.component.css']
})

export class ChatsListComponent implements OnInit {
  currentUser: User;
  pagination: any = {};
  chats: Chat[] = [];
  activeChat: Chat;

  constructor(private chatService: ChatService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllChats();
  }

  select(chat: Chat): void {
    this.activeChat = chat;
  }

  private loadAllChats() {
    this.chatService.list().subscribe(data => {
      this.chats = data['chats'];
    });
  }
}
