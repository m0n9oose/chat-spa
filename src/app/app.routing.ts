import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { ChatsListComponent }   from './chats-list/chats-list.component';

const appRoutes: Routes = [
  {
    path: 'sign_in',
    component: LoginComponent
  },
  {
    path: 'chats',
    component: ChatsListComponent
  }
]

export const routing = RouterModule.forRoot(
  appRoutes,
  { enableTracing: true }
);
