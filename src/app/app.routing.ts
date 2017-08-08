import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }       from './login/login.component';

const appRoutes: Routes = [
  {
    path: 'sign_in',
    component: LoginComponent
  }
]

export const routing = RouterModule.forRoot(
  appRoutes,
  { enableTracing: true }
);
