import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import User from '../../../../core/data/model/user.model';
import {filter, first} from 'rxjs/operators';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-client-practice-session-view-manager',
  templateUrl: './practice-session-view-manager.component.html',
  styleUrls: ['./practice-session-view-manager.component.css']
})
export class PracticeSessionViewManagerComponent implements OnInit, OnDestroy {

  authorizedUser: User;

  incomingCall: PracticeSession;
  initializedSession: PracticeSession;

  initializedSessionSubscription: Subscription;


  constructor(
    private store: Store<State>
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.authorizedUser), first()).toPromise();

    this.initializedSessionSubscription = this.store.pipe(
      select(state => state.clientPracticeSession.lastInitialized)
    ).subscribe((session: PracticeSession) => {

      if (session)
      {
        if (this.authorizedUser.id === session.callee.id)
        {
          this.incomingCall = session;
        }
        else if (this.authorizedUser.id === session.caller.id)
        {
          this.initializedSession = session;
        }
      }
    });

  }

  ngOnDestroy() {

    this.initializedSessionSubscription.unsubscribe();

  }

}
