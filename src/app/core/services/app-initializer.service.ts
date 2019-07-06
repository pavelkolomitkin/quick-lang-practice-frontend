import {Injectable} from '@angular/core';
import { SecurityService } from '../../security/services/security.service';
import {LocalStorageService} from './local-storage.service';
import User from '../data/model/user.model';
import {Store} from '@ngrx/store';
import {State} from '../../app.state';
import {UserInitializeError, UserInitializeSuccess} from '../../security/data/actions';
import {LanguageService} from './language.service';
import {LanguageLevelService} from './language-level.service';
import {GlobalLanguageLevelListLoaded, GlobalLanguageListLoaded} from '../data/actions';


export function appInitializeHandler(initializer: AppInitializerService)
{
  return () => {
    return initializer.initialize();
  };
}

@Injectable()
export class AppInitializerService
{
  constructor(
    private securityService: SecurityService,
    private localStorageService: LocalStorageService,
    private languageService: LanguageService,
    private languageLevelService: LanguageLevelService,
    private store: Store<State>
  ) {}

  public initialize(): Promise<any>
  {
    return new Promise<any>(async (resolve, reject) => {

      const languageListGet = this.languageService.getList().toPromise();
      const languageLevelListGet = this.languageLevelService.getList().toPromise();

      const languageList = await languageListGet;
      const languageLevelList = await languageLevelListGet;

      this.store.dispatch(new GlobalLanguageListLoaded(languageList));
      this.store.dispatch(new GlobalLanguageLevelListLoaded(languageLevelList));

      // Load current user
      const token = this.localStorageService.get('token');
      if (token === null)
      {
        resolve();
        return;
      }

      this.securityService.getAuthorizedUser().subscribe(
        (user: User) => {
          this.store.dispatch(new UserInitializeSuccess(user, token));
          resolve();
        },
        (error: Object) => {
          this.store.dispatch(new UserInitializeError(error));
          resolve();
        }
      );

    });
  }
}
