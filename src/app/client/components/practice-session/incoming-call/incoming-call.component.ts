import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-client-incoming-call',
  templateUrl: './incoming-call.component.html',
  styleUrls: ['./incoming-call.component.css'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(-100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(-100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false,
})
export class IncomingCallComponent extends Toast implements OnInit {

  @Output('onAcceptInit') acceptEvent: EventEmitter<{ session:  PracticeSession, type: string }> = new EventEmitter<{ session:  PracticeSession, type: string }>();
  @Output('onRejectInit') rejectEvent: EventEmitter<PracticeSession> = new EventEmitter<PracticeSession>();

  session: PracticeSession;

  audioInputEnabled: boolean = false;
  videoInputEnabled: boolean = false;

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

  ngOnInit() {

  }

  async onAcceptClickHandler(event, type: string)
  {
    this.acceptEvent.emit({
      session: this.session,
      type: type
    });
  }

  async onRejectClickHandler(event)
  {
    this.rejectEvent.emit(this.session);
  }

}
