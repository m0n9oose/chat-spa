import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { AlertModule }    from 'ngx-bootstrap';
import { FormsModule }    from '@angular/forms';
import {
  HttpModule,
  BaseRequestOptions
} from '@angular/http';

import { routing } from './app.routing'
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component'
import { ChatsListComponent } from './chats-list/chats-list.component'
import { ChatComponent } from './chat/chat.component'
import { AuthenticationService } from './_services/authentication.service'
import { ChatService } from './_services/chat.service'
import { WsService } from './_services/ws.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatsListComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    HttpModule,
    FormsModule,
    routing,
  ],
  providers: [
    AuthenticationService,
    ChatService,
    WsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
