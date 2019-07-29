import * as Peer from 'simple-peer';
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';
import {PracticeSessionService} from '../../../services/practice-session.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {UserMediaService} from '../../../services/user-media.service';
import {GlobalNotifyErrorMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-client-practice-session-window',
  templateUrl: './practice-session-window.component.html',
  styleUrls: ['./practice-session-window.component.css'],
})
export class PracticeSessionWindowComponent implements OnInit, OnDestroy {

  static WINDOW_SIZE_MINIMIZED = 'minimized';
  static WINDOW_SIZE_NORMAL = 'normal';
  static WINDOW_SIZE_FULLSCREEN = 'fullscreen';

  static SESSION_STATE_INITIALIZING = 'initializing';
  static SESSION_STATE_IN_PROCESS = 'inProcess';
  static SESSION_STATE_ERROR = 'error';
  static SESSION_STATE_END = 'end';

  currentWindowSize = PracticeSessionWindowComponent.WINDOW_SIZE_NORMAL;
  currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_INITIALIZING;


  @Input() session: PracticeSession;

  userMediaStream: any;
  @ViewChild('userVideo') userVideo: ElementRef;

  addresseeMediaStream: any;
  @ViewChild('addresseeVideo') addresseeVideo: ElementRef;

  peer: Peer;

  constructor(
    private store: Store<State>,
    private sessionService: PracticeSessionService,
    private mediaService: UserMediaService
  ) { }

  async ngOnInit() {

    try {
      this.validateMediaSupport();
    }
    catch (error) {
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(error.message)));
      this.currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_ERROR;
      return;
    }

    try {
      await this.initUserMedia();
    }
    catch (error) {
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Please, check your camera and microphone!')));
      return;
    }

    try {
      await this.initSession();
    }
    catch ({ errors: {error} }) {
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(error.message)));

      this.currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_ERROR;
      return;
    }

    this.store.pipe(
      select(state => state.clientPracticeSession.lastInProcess),
      filter(result => !!result)
    ).subscribe((session: PracticeSession) => {

      this.session = session;
      //debugger
      if (this.peer.initiator)
      {
        const peer = JSON.parse(this.session.calleePeer);
        this.peer.signal(peer);
      }

    });

    //this.currentSessionState = PracticeSessionWindowComponent.SESSION_STATE_IN_PROCESS;
  }

  ngOnDestroy() {
    if (this.peer)
    {
      this.peer.destroy();
    }
  }

  //======================== USER CONTROL ===========================

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

    this.userVideo.nativeElement.srcObject = this.userMediaStream;
    this.userVideo.nativeElement.play();
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
    }
  }

  async initSession()
  {
    const { session } = this;
    let isUserInitiator = !session.id;

    this.peer = new Peer({
      initiator: isUserInitiator,
      trickle: false,
      stream: this.userMediaStream
    });

    this.peer.on('signal', async (data) => {
      console.log('ON SIGNAL');
      console.log(data);

      const peerId = JSON.stringify(data);
      if (isUserInitiator)
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

      console.log('ON STREAM');
      this.addresseeMediaStream = stream;

      this.addresseeVideo.nativeElement.srcObject = this.addresseeMediaStream;
      this.addresseeVideo.nativeElement.play();

    });

    if (!isUserInitiator)
    {
      const callerPeer = JSON.parse(session.callerPeer);
      this.peer.signal(callerPeer);
    }

  }


  //======================// USER CONTROL ===========================
}
