import {BaseService} from '../../core/services/base.service';
import User from '../../core/data/model/user.model';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {PracticeSession} from '../../core/data/model/practice-session.model';
import {LanguageSkill} from '../../core/data/model/language-skill.model';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class PracticeSessionService extends BaseService
{
  getList(lastDate: string = null, status: string = null)
  {
    const params: HttpParams = this.getHttpParamsFromObject({
      lastDate: lastDate,
      status: status
    });

    return this.http.get<{ sessions: PracticeSession[] }>('/client/practice-session/list', {
      params
    }).pipe(
      map(({ sessions }) => sessions)
    );
  }

  init(addressee: User, skill: LanguageSkill, peer: string)
  {
    return this.http.post<{ session: PracticeSession }>('/client/practice-session/init/' + addressee.id + '/' + skill.id, {
      peer
    }).pipe(
      map(({ session }) => session)
    );
  }

  end(session: PracticeSession)
  {
    return this.http.put<{ session: PracticeSession }>('/client/practice-session/end/' + session.id, {}).pipe(
      map(({ session }) => session)
    );
  }

  accept(session: PracticeSession)
  {
    return this.http.put<{ session: PracticeSession }>('/client/practice-session/accept/' + session.id, {
      peer: session.calleePeer
    }).pipe(
      map(({ session }) => session)
    );
  }
}
