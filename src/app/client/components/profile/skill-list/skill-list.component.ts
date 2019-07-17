import {Component, Input, OnInit, ViewChild} from '@angular/core';
import User from '../../../../core/data/model/user.model';

import {LanguageSkill} from '../../../../core/data/model/language-skill.model';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ClientAddSkillWindowChangeState} from '../../../data/actions';
import {UserUpdated} from '../../../../security/data/actions';

@Component({
  selector: 'app-client-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  @Input() isEditable: boolean = false;

  @Input() user: User;

  constructor(private store: Store<State>) { }

  ngOnInit() {

  }

  onAddButtonClickHandler($event)
  {
    //this.modalRef = this.modalService.show(this.addSkillModalTemplate);
    this.store.dispatch(new ClientAddSkillWindowChangeState(true));

  }



  onDeleteSkillHandler(skill: LanguageSkill)
  {
    this.user.removeSkill(skill);
    this.store.dispatch(new UserUpdated(this.user));
  }

  onEditSkillHandler(skill: LanguageSkill)
  {
    const index = this.user.skills.findIndex((item) => {
      return (item.id === skill.id);
    });

    if (index !== -1)
    {
      this.user.skills[index] = skill;
      this.store.dispatch(new UserUpdated(this.user));
    }
  }

}
