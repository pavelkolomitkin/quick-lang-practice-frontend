import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import {SharedModule} from '../shared/shared.module';
import {ClientRoutingModule} from './client-routing.module';
import { AboutComponent } from './components/profile/about/about.component';
import {ProfileService} from './services/profile.service';

@NgModule({
  declarations: [
    ProfileComponent,
    SearchComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule
  ],
  providers: [
      ProfileService
  ]
})
export class ClientModule { }
