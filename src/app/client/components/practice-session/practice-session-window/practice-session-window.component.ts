import * as Peer from 'simple-peer';
import * as screenfull from 'screenfull';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';
import {PracticeSessionService} from '../../../services/practice-session.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {UserMediaService} from '../../../services/user-media.service';
import {GlobalNotifyErrorMessage, GlobalNotifySuccessMessage, GlobalNotifyWarningMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';
import {filter, first} from 'rxjs/operators';
import {PeerConnectionFactoryService} from '../../../services/peer-connection-factory.service';
import {Subscription} from 'rxjs';
import User from '../../../../core/data/model/user.model';

@Component({
  selector: 'app-client-practice-session-window',
  templateUrl: './practice-session-window.component.html',
  styleUrls: ['./practice-session-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PracticeSessionWindowComponent implements OnInit, OnDestroy {

  static WINDOW_SIZE_MINIMIZED = 'minimized';
  static WINDOW_SIZE_NORMAL = 'normal';
  static WINDOW_SIZE_FULLSCREEN = 'fullscreen';

  static SESSION_STATE_INITIALIZING = 'initializing';
  static SESSION_STATE_IN_PROCESS = 'inProcess';
  static SESSION_STATE_ERROR = 'error';
  static SESSION_STATE_UNANSWERED = 'unAnswered';
  static SESSION_STATE_END = 'ended';

  currentWindowSize = PracticeSessionWindowComponent.WINDOW_SIZE_NORMAL;
  previousWindowSize = PracticeSessionWindowComponent.WINDOW_SIZE_NORMAL;
  currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_INITIALIZING;
  //@ts-ignore
  fullScreenEnabled: boolean = screenfull.enabled;
  errorMessage: string;
  closedByMe: boolean = false;
  addressee: User;
  authorizedUser: User;

  durationSeconds: number;
  timerDescriptor: number = null;

  @Output('onClose') closeEvent: EventEmitter<PracticeSession> = new EventEmitter<PracticeSession>();

  @Input() session: PracticeSession;

  @ViewChild('windowElement') windowElement: ElementRef;

  userMediaStream: any;
  isUserVideoOn: boolean = false;
  @ViewChild('userVideo') userVideo: ElementRef;

  addresseeMediaStream: any;
  isAddresseeVideoOn: boolean = false;
  @ViewChild('addresseeVideo') addresseeVideo: ElementRef;

  peer: Peer;

  inProcessSessionSubscription: Subscription;
  unAnsweredSessionSubscription: Subscription;
  endedSessionSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private sessionService: PracticeSessionService,
    private mediaService: UserMediaService,
    private peerService: PeerConnectionFactoryService,
    private changeDetector: ChangeDetectorRef
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.authorizedUser), first()).toPromise();
    this.addressee = this.session.caller.id !== this.authorizedUser.id ? this.session.caller : this.session.callee;

    try {
      this.validateMediaSupport();
    }
    catch (error) {
      this.errorMessage = error.message;
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(this.errorMessage)));
      this.currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_ERROR;
      return;
    }

    try {
      await this.initUserMedia();
    }
    catch (error) {
      this.errorMessage = 'Please, check your camera and microphone!';
      this.currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_ERROR;
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(this.errorMessage)));
      return;
    }

    try {
      await this.initSession();
    }
    catch ({ errors: {error} }) {

      this.errorMessage = error.message;
      this.currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_ERROR;
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(this.errorMessage)));
      return;
    }

    this.inProcessSessionSubscription = this.store.pipe(
      select(state => state.clientPracticeSession.lastInProcess),
      filter(result => !!result),
      filter(result => result.id === this.session.id)
    ).subscribe((session: PracticeSession) => {

      this.session = session;
      //debugger
      if (this.peer.initiator)
      {
        const peer = JSON.parse(this.session.calleePeer);
        this.peer.signal(peer);
      }

      this.currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_IN_PROCESS;
    });

    this.endedSessionSubscription = this.store.pipe(
      select(state => state.clientPracticeSession.lastEnded),
      filter(result => !!result),
      filter(result => result.id === this.session.id)
    ).subscribe((session: PracticeSession) => {

      this.session = session;
      this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage('Session has been ended!')));

      this.closeEvent.emit(this.session);
    });

    this.unAnsweredSessionSubscription = this.store.pipe(
      select(state => state.clientPracticeSession.lastUnAnswered),
      filter(result => !!result),
      filter(result => result.id === this.session.id)
    ).subscribe((session: PracticeSession) => {

      this.session = session;

      if (!this.closedByMe)
      {
        this.store.dispatch(new GlobalNotifyWarningMessage(new NotifyMessage(session.callee.fullName + ' is not available now. Try it later ')));
      }
      this.closeEvent.emit(this.session);
    });


    //this.initTimer();

    this.initializeFullScreen();
  }


  initializeFullScreen()
  {
    if (this.fullScreenEnabled)
    {
      // @ts-ignore
      screenfull.on('change', () => {

        // @ts-ignore
        if (!screenfull.isFullscreen && (this.currentWindowSize === PracticeSessionWindowComponent.WINDOW_SIZE_FULLSCREEN))
        {
          //this.currentSessionState
          this.currentWindowSize = this.previousWindowSize;
        }

      });
    }
  }

  disposeFullScreen()
  {
    if (this.fullScreenEnabled)
    {
      // @ts-ignore
      screenfull.off('change');
    }
  }


  ngOnDestroy() {

    if (this.inProcessSessionSubscription)
    {
      this.inProcessSessionSubscription.unsubscribe();
    }
    if (this.endedSessionSubscription)
    {
      this.endedSessionSubscription.unsubscribe();
    }
    if (this.unAnsweredSessionSubscription)
    {
      this.unAnsweredSessionSubscription.unsubscribe();
    }

    if (this.peer)
    {
      this.peer.destroy();
    }

    this.disposeUserMedia();
    this.disposeAddresseeMedia();
  }

  //======================== USER CONTROL ===========================

  initTimer()
  {
    this.disposeTimer();

    this.durationSeconds = 0;
    this.timerDescriptor = setInterval(() => {

      this.durationSeconds++;

    }, 1000);
  }

  disposeTimer()
  {
    if (this.timerDescriptor)
    {
      clearInterval(this.timerDescriptor);
      this.timerDescriptor = null;
    }
  }

  validateMediaSupport()
  {
    if (!Peer.WEBRTC_SUPPORT) {

      throw new Error('Your browser does not support calls!');

    }
  }

  async initUserMedia()
  {
    await this.initUserMediaStream();
    if (!this.userMediaStream)
    {
      this.currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_ERROR;
      return;
    }

    const videoTracks: MediaStreamTrack[] = this.userMediaStream.getVideoTracks();
    if (videoTracks.length > 0)
    {
      const track = videoTracks[0];
      this.isUserVideoOn = track.enabled;
    }

    this.userVideo.nativeElement.srcObject = this.userMediaStream;
    this.userVideo.nativeElement.play();
  }

  disposeUserMedia()
  {
    if (this.userMediaStream)
    {
      this.userMediaStream.getTracks().forEach(track => track.stop());
      this.userMediaStream = null;
    }
  }

  disposeAddresseeMedia()
  {
    if (this.addresseeMediaStream)
    {
      this.addresseeMediaStream.getTracks().forEach(track => track.stop());
      this.addresseeMediaStream = null;
    }
  }

  async initUserMediaStream()
  {
    this.userMediaStream = await this.mediaService.getUserMedia(true, true);

  }

  onVideoStreamToggleHandler(event)
  {
    const videoTracks = this.userMediaStream.getVideoTracks();
    if (videoTracks.length > 0)
    {
      videoTracks[0].enabled = !videoTracks[0].enabled;
      this.isUserVideoOn = videoTracks[0].enabled;
    }
  }

  async initSession()
  {
    const { session } = this;

    if (!session.id)
    {
      this.peer = this.peerService.createInitiator(this.userMediaStream)
    }
    else
    {
      this.peer = this.peerService.createCallee(this.userMediaStream);
    }

    this.peer.on('signal', async (data) => {

      const peerId = JSON.stringify(data);
      if (this.peer.initiator)
      {
        this.session = await this.sessionService.init(session.callee, session.skill, peerId).toPromise();
      }
      else
      {
        session.calleePeer = peerId;
        this.session = await this.sessionService.accept(session).toPromise();
      }
    });

    this.peer.on('stream', (stream) => {

      this.addresseeMediaStream = stream;

      const tracks: MediaStreamTrack[] = this.addresseeMediaStream.getVideoTracks();
      if (tracks.length > 0)
      {
        const track = tracks[0];
        this.isAddresseeVideoOn = track.enabled;
        track.onmute = () => {
          console.log('ON ADDRESSEE VIDEO MUTE');
          this.isAddresseeVideoOn = false;
          this.changeDetector.markForCheck();
        };
        track.onunmute = () => {
          console.log('ON ADDRESSEE VIDEO UNMUTE');
          this.isAddresseeVideoOn = true;
          this.changeDetector.markForCheck();
        };

      }

      this.addresseeVideo.nativeElement.srcObject = this.addresseeMediaStream;
      this.addresseeVideo.nativeElement.play();

    });

    if (!this.peer.initiator)
    {
      const callerPeer = JSON.parse(session.callerPeer);
      this.peer.signal(callerPeer);
    }

  }

  onAddresseeVideoEvent(event)
  {
    console.log('ADDRESSEE VIDEO EVENT');
    console.log(event);
  }

  async onEndButtonClickHandler(event)
  {
    try {
      this.closedByMe = true;
      this.session = await this.sessionService.end(this.session).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  onMinimizeClickHandler(event)
  {
    this.setWindowSize(PracticeSessionWindowComponent.WINDOW_SIZE_MINIMIZED);
  }

  onNormalSizeClickHandler(event)
  {
    this.setWindowSize(PracticeSessionWindowComponent.WINDOW_SIZE_NORMAL);
  }

  onFullSizeClickHandler(event)
  {
    this.setWindowSize(PracticeSessionWindowComponent.WINDOW_SIZE_FULLSCREEN);
  }

  setWindowSize(size: string)
  {
    this.previousWindowSize = this.currentWindowSize;
    this.currentWindowSize = size;

    if (this.currentWindowSize === PracticeSessionWindowComponent.WINDOW_SIZE_FULLSCREEN)
    {
      // @ts-ignore
      screenfull.request(this.windowElement.nativeElement);
    }
    else
    {
      // @ts-ignore
      screenfull.exit();
    }
  }

  onMessageClickHandler(event)
  {
    this.setWindowSize(PracticeSessionWindowComponent.WINDOW_SIZE_MINIMIZED);

  }

  onDoubleClickAddresseeScreenHandler(event)
  {
    if (this.currentWindowSize !== PracticeSessionWindowComponent.WINDOW_SIZE_FULLSCREEN)
    {
      this.setWindowSize(PracticeSessionWindowComponent.WINDOW_SIZE_FULLSCREEN);
    }
    else
    {
      this.setWindowSize(this.previousWindowSize);
    }
  }

  //======================// USER CONTROL ===========================
}
