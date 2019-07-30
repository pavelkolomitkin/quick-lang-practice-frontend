import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import {SharedModule} from '../shared/shared.module';
import {ClientRoutingModule} from './client-routing.module';
import { AboutComponent } from './components/profile/about-page/about/about.component';
import { SkillListComponent } from './components/profile/about-page/skill-list/skill-list.component';
import { SkillItemComponent } from './components/profile/about-page/skill-list/skill-item/skill-item.component';
import { AddSkillFormComponent } from './components/common/add-skill-window/add-skill-form/add-skill-form.component';
import {ProfileService} from './services/profile.service';
import {LanguageSkillService} from './services/language-skill.service';
import { LayoutComponent } from './components/common/layout/layout.component';
import { HeaderComponent } from './components/common/header/header.component';
import {PracticeLanguageStatusComponent} from './components/common/header/practice-language-status/practice-language-status.component';
import { AddSkillWindowComponent } from './components/common/add-skill-window/add-skill-window.component';
import {Store, StoreModule} from '@ngrx/store';
import { reducer } from './data/reducer';
import { reducer as contactMessageReducer } from './data/contact-message.reducer';
import { reducer as profileReducer } from './data/profile.reducer';
import { reducer as userContactReducer } from './data/user-contact.reducer';
import { reducer as practiceSessionReducer } from './data/practice-session.reducer';
import { AvatarManagerComponent } from './components/common/avatar-manager/avatar-manager.component';
import { AboutPageComponent } from './components/profile/about-page/about-page.component';
import { ContactListPageComponent } from './components/my-profile/contact-list-page/contact-list-page.component'
import { ContactMessageObserverComponent } from './components/common/contact-message-observer/contact-message-observer.component';
import { ContactItemComponent } from './components/my-profile/contact-list-page/contact-item/contact-item.component';
import {UserContactService} from './services/user-contact.service';
import {ContactMessageService} from './services/contact-message.service';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyMenuComponent } from './components/my-profile/my-menu/my-menu.component';
import { ContactPageComponent } from './components/my-profile/contact-page/contact-page.component';
import { ContactMessageComponent } from './components/my-profile/contact-page/contact-message/contact-message.component';
import { MessageFormComponent } from './components/my-profile/contact-page/message-form/message-form.component';
import {MessagesSocketService} from './sockets/messages-socket.service';
import { AddresseeTypingComponent } from './components/common/addressee-typing/addressee-typing.component';
import { EditFormComponent } from './components/my-profile/contact-page/contact-message/edit-form/edit-form.component';
import { AddresseeControlComponent } from './components/my-profile/contact-page/addressee-control/addressee-control.component';
import {UsersSocketService} from './sockets/users-socket.service';
import { ProfileStateObserverComponent } from './components/common/profile-state-observer/profile-state-observer.component';
import {State} from '../app.state';
import {ClientNewMessageNumberChanged} from './data/profile.actions';
import { UserMenuComponent } from './components/profile/user-menu/user-menu.component';
import {PracticeSessionService} from './services/practice-session.service';
import {PracticeSessionsSocketService} from './sockets/practice-sessions-socket.service';
import { PracticeSessionObserverComponent } from './components/common/practice-session-observer/practice-session-observer.component';
import { PracticeSessionViewManagerComponent } from './components/practice-session/practice-session-view-manager/practice-session-view-manager.component';
import { PracticeSessionWindowComponent } from './components/practice-session/practice-session-window/practice-session-window.component';
import { PracticeSessionEndComponent } from './components/practice-session/practice-session-end/practice-session-end.component';
import {UserMediaService} from './services/user-media.service';
import {PeerConnectionFactoryService} from './services/peer-connection-factory.service';
import { PracticeSessionListPageComponent } from './components/my-profile/practice-session-list-page/practice-session-list-page.component';
import { PracticeSessionItemComponent } from './components/my-profile/practice-session-list-page/practice-session-item/practice-session-item.component';
import { EditableNameComponent } from './components/my-profile/editable-name/editable-name.component';

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
    AboutPageComponent,
    ContactListPageComponent,
    ContactMessageObserverComponent,
    ContactItemComponent,
    MyProfileComponent,
    MyMenuComponent,
    ContactPageComponent,
    ContactMessageComponent,
    MessageFormComponent,
    AddresseeTypingComponent,
    EditFormComponent,
    AddresseeControlComponent,
    ProfileStateObserverComponent,
    UserMenuComponent,
    PracticeSessionObserverComponent,
    PracticeSessionViewManagerComponent,
    PracticeSessionWindowComponent,
    PracticeSessionEndComponent,
    PracticeSessionListPageComponent,
    PracticeSessionItemComponent,
    EditableNameComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule,
    StoreModule.forFeature('client', reducer),
    StoreModule.forFeature('clientProfile', profileReducer),
    StoreModule.forFeature('clientContactMessage', contactMessageReducer),
    StoreModule.forFeature('clientUserContact', userContactReducer),
    StoreModule.forFeature('clientPracticeSession', practiceSessionReducer),
  ],
  providers: [
      UserMediaService,
      ProfileService,
      LanguageSkillService,
      UserContactService,
      ContactMessageService,
      PracticeSessionService,
      UsersSocketService,
      MessagesSocketService,
      PracticeSessionsSocketService,
      PeerConnectionFactoryService
  ],
  entryComponents: [
  ],
  exports: [
  ]
})
export class ClientModule {

  constructor(
      private contactService: UserContactService,
      private store: Store<State>
      ) {

    this
        .contactService
        .getNewMessageNumber()
        .toPromise()
        .then((value: number) => {

          this.store.dispatch(new ClientNewMessageNumberChanged(value));
    });

  }

}
