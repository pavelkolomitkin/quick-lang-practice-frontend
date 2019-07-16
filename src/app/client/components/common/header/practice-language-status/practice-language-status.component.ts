import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import User from '../../../../../core/data/model/user.model';
import {LanguageSkill} from '../../../../../core/data/model/language-skill.model';
import {ProfileService} from '../../../../services/profile.service';
import {UserUpdated} from '../../../../../security/data/actions';
import {GlobalNotifyErrorMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';
import {ClientAddSkillWindowChangeState} from '../../../../data/actions';

@Component({
  selector: '[app-client-practice-language-status]',
  templateUrl: './practice-language-status.component.html',
  styleUrls: ['./practice-language-status.component.css']
})
export class PracticeLanguageStatusComponent implements OnInit {

  @Input() authorizedUser: User;

  constructor(
      private store: Store<State>,
      private service: ProfileService,
      private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {


  }


  async onSkillClickHandler($event, skill: LanguageSkill)
  {

    const { readyToPracticeSkill } = this.authorizedUser;

    try {

      if (!!readyToPracticeSkill && (readyToPracticeSkill.id === skill.id))
      {
        skill = await this.service.setPracticeSkillStatus(null).toPromise();
      }
      else
      {
        skill = await this.service.setPracticeSkillStatus(skill).toPromise();
      }

      this.authorizedUser.readyToPracticeSkill = skill;

    }
    catch (error) {

      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Can not to switch status!')));

    }

    this.store.dispatch(new UserUpdated(this.authorizedUser));


    this.changeDetector.markForCheck();
  }

  onAddSkillClickHandler(event)
  {
    this.store.dispatch(new ClientAddSkillWindowChangeState(true));
  }
}
