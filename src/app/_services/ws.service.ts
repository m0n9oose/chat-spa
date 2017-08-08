import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/dom/webSocket';
import { Message } from '../_models/message'

const BASE_URL = 'ws://localhost:3000';

@Injectable()
export class WsService {
  private urlString: string;
  msgStream;
  constructor() {
    this.urlString = this.connectionUrl();
    this.msgStream = this.connect().map((response: MessageEvent): Message => {
      return JSON.parse(response.data)
    });
  }

  private subject: Subject<any>;

  connect(): Subject<MessageEvent> {
    if (!this.subject) { this.subject = this.create(); }
    return this.subject;
  }

  private create(): Subject<MessageEvent> {
    let ws = new WebSocket(this.urlString);
    console.log("Successfully connected: " + this.urlString);
    let observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      }
    )

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    }
    return Subject.create(observer, observable);
  }

  private connectionUrl(): string {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return BASE_URL +
        '?email=' + currentUser.email +
        '&token=' + currentUser.token
    } else {
      return BASE_URL;
    }
  }
}
