import { Component }   from '@angular/core';
import { Input }       from '@angular/core';
import { ViewChild }   from '@angular/core';
import { ElementRef }  from '@angular/core';

import { Chat }        from '../_models/chat';
import { Message }     from '../_models/message';
import { User }        from '../_models/user';
import { ChatService } from '../_services/chat.service';
import { WsService }   from '../_services/ws.service';

@Component({
  selector: 'chat-container',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
})

export class ChatComponent {
  @ViewChild('messagesElem') messagesElem: ElementRef;
  @Input()
  set selectedChat(chat: Chat) {
    this._selectedChat = chat;
    this.loadChat();
  }

  get selectedChat(): Chat {
    return this._selectedChat;
  }

  messages: Message[] = [];
  members: User[] = [];
  model: any = {};
  loading = false;
  private _selectedChat: Chat;

  constructor(
    private elRef: ElementRef,
    private chatService: ChatService,
    private wsService: WsService
  ) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.messagesElem.nativeElement.scrollTop = this.messagesElem.nativeElement.scrollHeight
  }

  submitMessage() {
    this.loading = true;
    this.chatService.postMessage(this._selectedChat.id, this.model.text)
      .subscribe(
        data => {
          this.model.text = '';
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  incomingMessage(message: Message) {
    this.messages.push(message);
  }

  private loadChat(): void {
    this.chatService.get(this._selectedChat.id).subscribe(data => {
      this.messages = data['chat']['messages'];
      this.members = data['chat']['users']
      this.scrollToBottom();
    });
  }
}
