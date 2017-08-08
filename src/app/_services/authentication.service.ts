import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {
  Http,
  Headers,
  Response,
  RequestOptions
} from '@angular/http';

@Injectable()
export class AuthenticationService {
  loggedin = false;

  constructor(private http: Http) {}

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/sessions', JSON.stringify({
        user: {
          email: email,
          password: password
        }
      }), this.headers())
      .map((response: Response) => {
        let user = response.json()['user'];
        if (user && user.token) {
          user.email = email;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.loggedin = true;
    }
  }

  private headers() {
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return new RequestOptions({
      headers: headers
    });
  }
}
