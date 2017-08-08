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
  msgStream;
  constructor() {
    this.msgStream = this.connect().map((response: MessageEvent): Message => {
      return JSON.parse(response.data)
    });
  }
  private subject: Subject<any>;

  public connect(): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(BASE_URL);
      console.log("Successfully connected: " + BASE_URL);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(BASE_URL);

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
}
