import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response,
  URLSearchParams
} from '@angular/http';
import 'rxjs/add/operator/map';
import { Chat } from '../_models/chat';
import { Message } from '../_models/message';

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

  private options() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    // let params: URLSearchParams = new URLSearchParams();
    if (currentUser && currentUser.token) {
      headers.set('X-User-Email', currentUser.email)
      headers.set('X-User-Token', currentUser.token)
    }

    return new RequestOptions({
      headers: headers,
      // params: params,
    });
  }
}