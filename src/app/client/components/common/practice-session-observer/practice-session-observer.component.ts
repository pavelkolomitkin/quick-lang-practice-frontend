import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {PracticeSessionsSocketService} from '../../../sockets/practice-sessions-socket.service';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';
import {Subscription} from 'rxjs';
import {
  ClientPracticeSessionEnded,
  ClientPracticeSessionInitialized,
  ClientPracticeSessionInProcess, ClientPracticeSessionUnAnswered
} from '../../../data/practice-session.actions';

@Component({
  selector: 'app-client-practice-session-observer',
  templateUrl: './practice-session-observer.component.html',
  styleUrls: ['./practice-session-observer.component.css']
})
export class PracticeSessionObserverComponent implements OnInit, OnDestroy {

  initializeSessionSubscription: Subscription;
  endSessionSubscription: Subscription;
  inProcessSessionSubscription: Subscription;
  unAnsweredSessionSubscription: Subscription;


  constructor(
    private store: Store<State>,
    private socket: PracticeSessionsSocketService
  ) { }

  ngOnInit() {

    this.initializeSessionSubscription = this.socket.getInitializedSession().subscribe(this.onSessionInitializeHandler);
    this.endSessionSubscription = this.socket.getEndedSession().subscribe(this.onSessionEndHandler);
    this.inProcessSessionSubscription = this.socket.getInProcessSession().subscribe(this.onSessionProcessHandler);
    this.unAnsweredSessionSubscription = this.socket.getUnAnsweredSession().subscribe(this.onUnAnsweredSessionHandler);

  }

  ngOnDestroy() {

    this.initializeSessionSubscription.unsubscribe();
    this.endSessionSubscription.unsubscribe();
    this.inProcessSessionSubscription.unsubscribe();
    this.unAnsweredSessionSubscription.unsubscribe();
  }

  onSessionInitializeHandler = (session: PracticeSession) => {
    this.store.dispatch(new ClientPracticeSessionInitialized(session));
  };

  onSessionEndHandler = (session: PracticeSession) => {
    this.store.dispatch(new ClientPracticeSessionEnded(session));
  };

  onSessionProcessHandler = (session: PracticeSession) => {
    this.store.dispatch(new ClientPracticeSessionInProcess(session));
  };

  onUnAnsweredSessionHandler = (session: PracticeSession) => {
    this.store.dispatch(new ClientPracticeSessionUnAnswered(session));
  };
}
