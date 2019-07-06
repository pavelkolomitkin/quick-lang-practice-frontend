import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import {SharedModule} from '../shared/shared.module';
import {ClientRoutingModule} from './client-routing.module';
import { AboutComponent } from './components/profile/about/about.component';
import {ProfileService} from './services/profile.service';
import { SkillListComponent } from './components/profile/skill-list/skill-list.component';
import { SkillItemComponent } from './components/profile/skill-list/skill-item/skill-item.component';
import { AddSkillFormComponent } from './components/profile/skill-list/add-skill-form/add-skill-form.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SearchComponent,
    AboutComponent,
    SkillListComponent,
    SkillItemComponent,
    AddSkillFormComponent
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
