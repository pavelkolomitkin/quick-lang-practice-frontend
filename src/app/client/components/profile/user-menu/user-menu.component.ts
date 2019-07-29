import {Component, Input, OnInit} from '@angular/core';
import User from '../../../../core/data/model/user.model';
import {ProfileService} from '../../../services/profile.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {GlobalNotifyErrorMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';
import {first} from 'rxjs/operators';
import {LanguageSkill} from '../../../../core/data/model/language-skill.model';
import {ClientAddSkillWindowChangeState} from '../../../data/actions';
import {PracticeSessionService} from '../../../services/practice-session.service';
import {ClientPracticeSessionPreInitialize} from '../../../data/practice-session.actions';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';

@Component({
  selector: 'app-client-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  @Input() user: User;

  authorizedUser: User;

  iBlockUser: boolean = false;
  userBlockedMe: boolean = false;

  ready: boolean = false;

  constructor(
    private service: ProfileService,
    private practiceSessionService: PracticeSessionService,
    private store: Store<State>
  ) { }

  async ngOnInit() {

    this.ready = false;

     this.authorizedUser = await this.store.pipe(select(state => state.security.authorizedUser), first()).toPromise();

     const iBlockUserGet = this.service.isUserBlockedByMe(this.user).toPromise();
     const userBlockedMeGet = this.service.amIBlockedBy(this.user).toPromise();

     this.iBlockUser = await iBlockUserGet;
     this.userBlockedMe = await userBlockedMeGet;

     this.ready = true;

  }

  async onBlockClickHandler(event)
  {
    try {
      await this.service.blockProfile(this.user).toPromise();
      this.iBlockUser = true;
    }
    catch (error) {
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Error: Can not to block the user. Try later!')));
    }
  }

  async onUnBlockClickHandler(event)
  {
    try {
      await this.service.unBlockProfile(this.user).toPromise();
      this.iBlockUser = false;
    }
    catch (error) {
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Error: Can not to unblock the user. Try later!')));
    }
  }

  async onSelectPracticeSkillHandler(skill: LanguageSkill)
  {
    const session: PracticeSession = new PracticeSession();
    session.caller = this.authorizedUser;
    session.callee = this.user;
    session.skill = skill;

    this.store.dispatch(new ClientPracticeSessionPreInitialize(session));
  }

  onCreateSkillClickHandler(event)
  {
    this.store.dispatch(new ClientAddSkillWindowChangeState(true));
  }
}
