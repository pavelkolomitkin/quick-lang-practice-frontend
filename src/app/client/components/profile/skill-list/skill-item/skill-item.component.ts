import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LanguageSkill} from '../../../../../core/data/model/language-skill.model';
import {ProfileService} from '../../../../services/profile.service';
import {State} from '../../../../../app.state';
import {Store} from '@ngrx/store';
import {GlobalNotifyErrorMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';
import {ConfirmActionService} from '../../../../../core/services/confirm-action.service';
import {ConfirmationActionOption} from '../../../../../core/data/model/confirmation-action-option.model';

@Component({
  selector: '[app-client-skill-item]',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css']
})
export class SkillItemComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<LanguageSkill> = new EventEmitter();

  @Input() isEditable: boolean = false;

  @Input() skill: LanguageSkill;

  constructor(
      private store: Store<State>,
      private service: ProfileService,
      private confirmationService: ConfirmActionService
  ) { }

  ngOnInit() {

  }

  async onDeleteClickHandler(event)
  {

    this.confirmationService.confirm(
        'Remove skill?',
        'Are you sure you wanna remove it?',
        [
            new ConfirmationActionOption('Remove', 'danger', async () => {

              try {

                await this.service.removeSkill(this.skill).toPromise();

                this.deleteEvent.emit(this.skill);

              }
              catch ({ error }) {
                this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Cannot delete this skill!')));
              }

            }),

            new ConfirmationActionOption('Cancel')
        ]
        );

  }

}
