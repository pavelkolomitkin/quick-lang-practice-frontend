import {BaseService} from '../../core/services/base.service';
import User from '../../core/data/model/user.model';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {PracticeSession} from '../../core/data/model/practice-session.model';
import {LanguageSkill} from '../../core/data/model/language-skill.model';

@Injectable()
export class PracticeSessionService extends BaseService
{
  init(addressee: User, skill: LanguageSkill)
  {
    return this.http.post<{ session: PracticeSession }>('/client/practice-session/init/' + addressee.id + '/' + skill.id, {}).pipe(
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
    return this.http.put<{ session: PracticeSession }>('/client/practice-session/accept/' + session.id, {}).pipe(
      map(({ session }) => session)
    );
  }
}
