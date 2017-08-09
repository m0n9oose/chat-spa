import { Injectable }       from '@angular/core';
import { Http }             from '@angular/http';
import { Headers }          from '@angular/http';
import { RequestOptions }   from '@angular/http';
import { Response }         from '@angular/http';
import { URLSearchParams }  from '@angular/http';

import 'rxjs/add/operator/map';
import { Chat }             from '../_models/chat';
import { Message }          from '../_models/message';

@Injectable()
export class ChatService {
  constructor(private http: Http) {}

  list() {
    return this.http.get(
      'http://localhost:3000/chats',
      this.options()
    ).map((response: Response) => response.json());
  }

  get(chatId) {
    return this.http.get(
      'http://localhost:3000/chats/' + chatId,
      this.options()
    ).map((response: Response) => response.json());
  }

  postMessage(chatId: number, text: string) {
    return this.http.post(
      'http://localhost:3000/chats/' + chatId + '/messages',
      { text: text },
      this.options()
    ).map((response: Response) => response.json());
  }

  private options() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    if (currentUser && currentUser.token) {
      headers.set('X-User-Email', currentUser.email)
      headers.set('X-User-Token', currentUser.token)
    }

    return new RequestOptions({ headers: headers });
  }
}
