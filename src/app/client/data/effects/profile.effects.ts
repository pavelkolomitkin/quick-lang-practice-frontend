import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {USER_LOGOUT} from '../../../security/data/actions';
import {tap} from 'rxjs/operators';
import {State} from '../../../core/data/reducer';
import {ClientPracticeSessionReset} from '../practice-session.actions';

@Injectable()
export class ProfileEffects
{
  @Effect({dispatch: false})
  logoutEffect: Observable<Action> = this.actions.pipe(
    ofType(USER_LOGOUT),
    tap(() => {
      this.store.dispatch(new ClientPracticeSessionReset());
    })
  );

  constructor(
    private actions: Actions,
    private store: Store<State>,
  ) {}
}
