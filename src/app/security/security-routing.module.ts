import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterPageComponent} from './components/register-page/register-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {ConfirmationPageComponent} from './components/confirmation-page/confirmation-page.component';
import {RegisterSuccessfulPageComponent} from "./components/register-successful-page/register-successful-page.component";
import {PasswordRecoveryRequestPageComponent} from './components/password-recovery-request-page/password-recovery-request-page.component';
import {PasswordResetPageComponent} from './components/password-reset-page/password-reset-page.component';

const routes: Routes = [
  { path: '', children: [

      { path: 'register-success', component: RegisterSuccessfulPageComponent },
      { path: 'register-confirm/:key', component: ConfirmationPageComponent},
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'password-recovery-request', component: PasswordRecoveryRequestPageComponent },
      { path: 'password-recovery/:key', component: PasswordResetPageComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule{}
