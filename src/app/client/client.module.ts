import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import {SharedModule} from '../shared/shared.module';
import {ClientRoutingModule} from './client-routing.module';
import { AboutComponent } from './components/profile/about/about.component';
import { SkillListComponent } from './components/profile/skill-list/skill-list.component';
import { SkillItemComponent } from './components/profile/skill-list/skill-item/skill-item.component';
import { AddSkillFormComponent } from './components/common/add-skill-window/add-skill-form/add-skill-form.component';
import {ProfileService} from './services/profile.service';
import {LanguageSkillService} from './services/language-skill.service';
import { LayoutComponent } from './components/common/layout/layout.component';
import { HeaderComponent } from './components/common/header/header.component';
import {PracticeLanguageStatusComponent} from './components/common/header/practice-language-status/practice-language-status.component';
import { AddSkillWindowComponent } from './components/common/add-skill-window/add-skill-window.component';
import {StoreModule} from '@ngrx/store';
import { reducer } from './data/reducer';
import { AvatarManagerComponent } from './components/profile/avatar-manager/avatar-manager.component'

@NgModule({
  declarations: [
    ProfileComponent,
    SearchComponent,
    AboutComponent,
    SkillListComponent,
    SkillItemComponent,
    AddSkillFormComponent,
    LayoutComponent,
    HeaderComponent,
    PracticeLanguageStatusComponent,
    AddSkillWindowComponent,
    AvatarManagerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule,
    StoreModule.forFeature('client', reducer),
  ],
  providers: [
      ProfileService,
      LanguageSkillService,
  ]
})
export class ClientModule { }
