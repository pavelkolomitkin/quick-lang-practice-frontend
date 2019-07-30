import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PracticeSession} from '../../../../../core/data/model/practice-session.model';
import User from '../../../../../core/data/model/user.model';
import {PracticeSessionStatusCodes} from '../../../../../core/data/model/practice-session-status.model';
import * as moment from 'moment';
import {PracticeSessionService} from '../../../../services/practice-session.service';

@Component({
  selector: 'app-client-practice-session-item',
  templateUrl: './practice-session-item.component.html',
  styleUrls: ['./practice-session-item.component.css']
})
export class PracticeSessionItemComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<PracticeSession> = new EventEmitter<PracticeSession>();

  @Input() session: PracticeSession;
  @Input() user: User;
  addressee: User;

  sessionDuration: string = '';

  constructor(
    private service: PracticeSessionService
  ) { }

  ngOnInit() {

    this.addressee = this.session.caller.id === this.user.id ? this.session.callee : this.session.caller;

    if (this.session.status.code !== PracticeSessionStatusCodes.UNANSWERED)
    {
      const startTime = moment(this.session.progressStartTime);
      const endTime = moment(this.session.progressEndTime);

      const diffTime = endTime.diff(startTime);
      this.sessionDuration = moment.utc(diffTime).format('HH:mm:ss');
    }

  }

  async onDeleteClickHandler(event)
  {

  }

}
