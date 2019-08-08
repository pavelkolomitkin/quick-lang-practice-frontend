import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {USER_INITIALIZE_SUCCESS, USER_LOGOUT} from '../../../security/data/actions';
import {tap} from 'rxjs/operators';
import {State} from '../../../core/data/reducer';
import {ClientPracticeSessionReset} from '../practice-session.actions';
import {UserContactService} from '../../services/user-contact.service';
import {ClientNewMessageNumberChanged} from '../profile.actions';

@Injectable()
export class ProfileEffects
{
  @Effect({ dispatch: false })
  userInitializedEffect: Observable<Action> = this.actions.pipe(
    ofType(USER_INITIALIZE_SUCCESS),
    tap( async () => {

      let newMessageNumber = 0;
      try {
        newMessageNumber = await this.contactService.getNewMessageNumber().toPromise();
      }
      catch (error) {
      }

      this.store.dispatch(new ClientNewMessageNumberChanged(newMessageNumber));

    })
  );

  @Effect({dispatch: false})
  logoutEffect: Observable<Action> = this.actions.pipe(
    ofType(USER_LOGOUT),
    tap(() => {
      this.store.dispatch(new ClientPracticeSessionReset());
      this.store.dispatch(new ClientNewMessageNumberChanged(0));
    })
  );

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private contactService: UserContactService
  ) {}
}
