import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppSecurityLayoutComponent} from './components/app-security-layout/app-security-layout.component';
import {AppLayoutComponent} from './components/app-layout/app-layout.component';
import {DefaultRedirectGuard} from './security/services/guards/default-redirect-guard.service';
import {NotFoundPageComponent} from './shared/components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'security', component: AppSecurityLayoutComponent,  loadChildren: './security/security.module#SecurityModule' },
  { path: '', component: AppLayoutComponent, canActivate: [DefaultRedirectGuard], pathMatch: 'full', children: [] },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
