import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import User from '../../../../core/data/model/user.model';
import {filter, first} from 'rxjs/operators';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';
import {combineLatest, Subscription} from 'rxjs';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {IncomingCallComponent} from '../incoming-call/incoming-call.component';
import {PracticeSessionService} from '../../../services/practice-session.service';
import {ClientPracticeSessionPreInitialize} from '../../../data/practice-session.actions';
import {UserMediaService} from '../../../services/user-media.service';

@Component({
  selector: 'app-client-practice-session-view-manager',
  templateUrl: './practice-session-view-manager.component.html',
  styleUrls: ['./practice-session-view-manager.component.css']
})
export class PracticeSessionViewManagerComponent implements OnInit, OnDestroy {

  authorizedUser: User;

  preInitialized: PracticeSession;
  preInitializedMediaType: string;
  incomingCallToasts: ActiveToast<any>[] = [];

  preInitializeSessionSubscription: Subscription;
  initializedSessionSubscription: Subscription;
  endedSessionSubscription: Subscription;
  unAnsweredSessionSubscription: Subscription;


  constructor(
    private store: Store<State>,
    private toastr: ToastrService,
    private sessionService: PracticeSessionService,
    private mediaService: UserMediaService
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.authorizedUser), first()).toPromise();

    this.preInitializeSessionSubscription = combineLatest(
      this.store.pipe(
        select(state => state.clientPracticeSession.preInitialized),
        filter(result => !!result)
      ),
      this.store.pipe(
        select(state => state.clientPracticeSession.preInitializedMediaType),
        filter(result => !!result)
      )
    ).subscribe(([session, type]) => {

      this.preInitialized = session;
      this.preInitializedMediaType = type;

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

  async showIncomingCall(session: PracticeSession)
  {
    const isAudioInputAvailable: boolean = (await this.mediaService.getAvailableAudioDevices()).length > 0;
    const isVideoInputAvailable: boolean = (await this.mediaService.getAvailableVideoDevices()).length > 0;

    const toast = this.toastr.show('', '', {
      toastComponent: IncomingCallComponent,
      positionClass: 'toast-bottom-left',
      disableTimeOut: true,
      toastClass: 'ngx-toastr ng-trigger ng-trigger-flyInOut client-toast',
      tapToDismiss: false
    });

    // @ts-ignore
    toast.toastRef.componentInstance.session = session;
    toast.toastRef.componentInstance.audioInputEnabled = isAudioInputAvailable;
    toast.toastRef.componentInstance.videoInputEnabled = isVideoInputAvailable;

    toast.toastRef.componentInstance.acceptEvent.subscribe(async ({session, type}) => {

      this.store.dispatch(new ClientPracticeSessionPreInitialize(session, type));
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
