import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ProfileService} from '../../../../../client/services/profile.service';
import {Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import User from '../../../../data/model/user.model';
import {LanguageSkill} from '../../../../data/model/language-skill.model';

@Component({
  selector: '[app-practice-language-status]',
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
    if (this.authorizedUser.readyToPracticeSkill && (this.authorizedUser.readyToPracticeSkill.id === skill.id))
    {
      this.authorizedUser.readyToPracticeSkill = await this.service.setPracticeSkillStatus(null).toPromise();

    }
    else
    {
      this.authorizedUser.readyToPracticeSkill = await this.service.setPracticeSkillStatus(skill).toPromise();
    }

    this.changeDetector.markForCheck();
  }
}
