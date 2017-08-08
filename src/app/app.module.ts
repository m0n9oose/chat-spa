import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { AlertModule }    from 'ngx-bootstrap';
import { FormsModule }    from '@angular/forms';
import {
  HttpModule,
  BaseRequestOptions
} from '@angular/http';

import { routing } from './app.routing'
import { AppComponent }   from './app.component';

import { LoginComponent } from './login/login.component'
import { AuthenticationService } from './_services/authentication.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
