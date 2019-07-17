import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {LanguageSkill} from '../../../../core/data/model/language-skill.model';
import {Subscription} from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {ClientAddSkillWindowChangeState} from '../../../data/actions';
import User from '../../../../core/data/model/user.model';
import {UserUpdated} from '../../../../security/data/actions';

@Component({
  selector: 'app-client-add-skill-window',
  templateUrl: './add-skill-window.component.html',
  styleUrls: ['./add-skill-window.component.css']
})
export class AddSkillWindowComponent implements OnInit, OnDestroy {

  @Input() user: User;

  @ViewChild(ModalDirective) modal: ModalDirective;

  windowStateSubscription: Subscription;

  constructor(
      private store: Store<State>
  ) { }

  ngOnInit() {

    this.windowStateSubscription = this.store.pipe(select(state => state.client.isAddSkillWindowShown)).subscribe(
        (isOpen: boolean) => {

          if (isOpen)
          {
            if (!this.modal.isShown)
            {
              this.modal.show();
            }
          }
          else
          {
            if (this.modal.isShown)
            {
              this.modal.hide();
            }
          }
        }
    );
  }

  ngOnDestroy(): void {

    this.windowStateSubscription.unsubscribe();
    this.windowStateSubscription = null;

  }

  async onSkillCreateHandler(skill: LanguageSkill)
  {
    this.user.skills.push(skill);

    this.store.dispatch(new UserUpdated(this.user));
    this.store.dispatch(new ClientAddSkillWindowChangeState(false));
  }

  onWindowHideHandler(event: ModalDirective)
  {
    this.store.dispatch(new ClientAddSkillWindowChangeState(false));
  }


}
