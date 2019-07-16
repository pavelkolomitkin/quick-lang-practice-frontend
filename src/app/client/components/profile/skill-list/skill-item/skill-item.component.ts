import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LanguageSkill} from '../../../../../core/data/model/language-skill.model';
import {State} from '../../../../../app.state';
import {select, Store} from '@ngrx/store';
import {GlobalNotifyErrorMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';
import {ConfirmActionService} from '../../../../../core/services/confirm-action.service';
import {ConfirmationActionOption} from '../../../../../core/data/model/confirmation-action-option.model';
import {LanguageLevel} from '../../../../../core/data/model/language-level.model';
import {Observable} from 'rxjs';
import {LanguageSkillService} from '../../../../services/language-skill.service';

@Component({
  selector: '[app-client-skill-item]',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css']
})
export class SkillItemComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<LanguageSkill> = new EventEmitter();
  @Output('onEdit') editEvent: EventEmitter<LanguageSkill> = new EventEmitter();

  @Input() isEditable: boolean = false;

  @Input() skill: LanguageSkill;

  @ViewChild('levelSelector') levelSelector: ElementRef;
  @ViewChild('editButton') editButton: ElementRef;

  isEditing: boolean = false;

  selectedLevel: LanguageLevel;
  languageLevels: Observable<Array<LanguageLevel>>;

  constructor(
      private store: Store<State>,
      private service: LanguageSkillService,
      private confirmationService: ConfirmActionService
  ) { }

  ngOnInit() {

    this.selectedLevel = this.skill.level;
    this.languageLevels = this.store.pipe(select(state => state.core.languageLevels));

  }

  async onDeleteClickHandler(event)
  {

    this.confirmationService.confirm(
        'Remove skill?',
        'Are you sure you wanna remove it?',
        [
            new ConfirmationActionOption('Remove', 'danger', async () => {

              try {

                await this.service.remove(this.skill).toPromise();

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

  onEditClickHandler(event)
  {
    this.isEditing = true;

    setTimeout(() => {

      this.levelSelector.nativeElement.focus();

    }, 10);
  }

  onLevelBlurHandler(event)
  {
    this.isEditing = false;
  }

  async onLevelChangeHandler(event)
  {
    this.isEditing = false;

    this.skill.level = this.selectedLevel;

    this.skill = await this.service.update(this.skill).toPromise();
    this.editEvent.emit(this.skill);
  }

  compareEntity(a: any, b: any)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

}
