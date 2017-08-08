import { Component, OnInit, Input }  from '@angular/core';
import { Chat }               from '../_models/chat';
import { Message }            from '../_models/message';
import { User }               from '../_models/user';
import { ChatService }        from '../_services/chat.service';

@Component({
  selector: 'chat-container',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
})

export class ChatComponent implements OnInit {
  @Input() selectedChat: Chat;
  messages: Message[] = [];
  members: User[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadChat();
  }

  private loadChat() {
    this.chatService.get(this.selectedChat.id).subscribe(data => {
      this.messages = data['chat']['messages'];
      this.members = data['chat']['users']
    });
  }
}
