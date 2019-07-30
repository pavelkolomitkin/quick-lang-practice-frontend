import {BaseSocketService} from '../../core/services/base-socket.service';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {PracticeSession} from '../../core/data/model/practice-session.model';

@Injectable()
export class PracticeSessionsSocketService extends BaseSocketService
{
  getNamespace(): string {
    return 'practice-sessions';
  }

  getInitializedSession()
  {
    return this.fromEvent('practice_session_init').pipe(
      map(data => <PracticeSession>data)
    );
  }

  getUnAnsweredSession()
  {
    return this.fromEvent('practice_session_unanswered').pipe(
      map(data => <PracticeSession>data)
    );
  }

  getInProcessSession()
  {
    return this.fromEvent('practice_session_in_process').pipe(
      map(data => <PracticeSession>data)
    );
  }

  getEndedSession()
  {
    return this.fromEvent('practice_session_ended').pipe(
      map(data => <PracticeSession>data)
    );
  }
}
