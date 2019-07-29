import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import User from '../../../../core/data/model/user.model';
import {filter, first} from 'rxjs/operators';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';
import {Subscription} from 'rxjs';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {IncomingCallComponent} from '../incoming-call/incoming-call.component';
import {PracticeSessionService} from '../../../services/practice-session.service';
import {ClientPracticeSessionPreInitialize} from '../../../data/practice-session.actions';

@Component({
  selector: 'app-client-practice-session-view-manager',
  templateUrl: './practice-session-view-manager.component.html',
  styleUrls: ['./practice-session-view-manager.component.css']
})
export class PracticeSessionViewManagerComponent implements OnInit, OnDestroy {

  authorizedUser: User;

  preInitialized: PracticeSession;
  incomingCallToasts: ActiveToast<any>[] = [];

  preInitializeSessionSubscription: Subscription;
  initializedSessionSubscription: Subscription;
  endedSessionSubscription: Subscription;
  unAnsweredSessionSubscription: Subscription;


  constructor(
    private store: Store<State>,
    private toastr: ToastrService,
    private sessionService: PracticeSessionService,
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.authorizedUser), first()).toPromise();

    this.preInitializeSessionSubscription = this.store.pipe(
      select(state => state.clientPracticeSession.preInitialized),
      filter(result => !!result)
    ).subscribe((session: PracticeSession) => {
      this.preInitialized = session;
    });

    this.initializedSessionSubscription = this.store.pipe(
      select(state => state.clientPracticeSession.lastInitialized),
      filter(result => !!result)
    ).subscribe((session: PracticeSession) => {

      if (this.authorizedUser.id === session.callee.id)
      {
        this.showIncomingCall(session);
      }
    });

    this.endedSessionSubscription = this.store.pipe(
      select(state => state.clientPracticeSession.lastEnded),
      filter(result => !!result)
    ).subscribe((session: PracticeSession) => {
      this.hideIncomingCall(session);
    });

    this.unAnsweredSessionSubscription = this.store.pipe(
      select(state => state.clientPracticeSession.lastUnAnswered),
      filter(result => !!result)
    ).subscribe((session: PracticeSession) => {
      this.hideIncomingCall(session);
    });

  }

  ngOnDestroy() {

    this.preInitializeSessionSubscription.unsubscribe();
    this.initializedSessionSubscription.unsubscribe();
    this.endedSessionSubscription.unsubscribe();
    this.unAnsweredSessionSubscription.unsubscribe();

  }

  showIncomingCall(session: PracticeSession)
  {
    const toast = this.toastr.show('', '', {
      toastComponent: IncomingCallComponent,
      positionClass: 'toast-bottom-left',
      disableTimeOut: true,
      toastClass: 'ngx-toastr ng-trigger ng-trigger-flyInOut client-toast',
      tapToDismiss: false
    });

    // @ts-ignore
    toast.toastRef.componentInstance.session = session;

    toast.toastRef.componentInstance.acceptEvent.subscribe(async (session: PracticeSession) => {

      this.store.dispatch(new ClientPracticeSessionPreInitialize(session));
      this.hideIncomingCall(session);

    });
    toast.toastRef.componentInstance.rejectEvent.subscribe( async (session: PracticeSession) => {

      try {
        await this.sessionService.end(session).toPromise();
      }
      catch (error) {
        console.log(error);
      }
      this.hideIncomingCall(session);

    });

    this.incomingCallToasts.push(toast);
  }

  hideIncomingCall(session: PracticeSession)
  {
    const index = this.incomingCallToasts.findIndex((item) => item.toastRef.componentInstance.session.id === session.id);
    if (index !== -1)
    {
      const toast = this.incomingCallToasts[index];
      //toast.toastRef.close();
      toast.toastRef.manualClose();

      this.incomingCallToasts.splice(index, 1);
    }
  }

  onWindowCloseHandler(session: PracticeSession)
  {
    this.preInitialized = null;
  }
}
