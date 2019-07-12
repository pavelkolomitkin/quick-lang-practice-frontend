import {Injectable} from '@angular/core';
import RegisterData from '../data/model/register-data.model';
import User from '../../core/data/model/user.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import LoginCredentials from '../data/model/login-credentials.model';
import {BaseService} from '../../core/services/base.service';

@Injectable()
export class SecurityService extends BaseService
{
  registerUser(data: RegisterData): Observable<any>
  {
    return this.http.post('/security/register', data);
  }

  registerConfirm(confirmationKey: string): Observable<any>
  {
    return this.http.put('/security/register-confirm', {
      key: confirmationKey
    });
  }

  login(credentials: LoginCredentials)
  {
    return this.http.post<{ token: string }>('/security/login', {
      email: credentials.email,
      password: credentials.password
    }).pipe(
      map(result => result.token)
    );
  }

  getAuthorizedUser()
  {
    return this.http.get<{user: User}>('/security/profile').pipe(
      map((result) => {
        return User.createFromRawData(result);
      })
    );
  }

  passwordRecoverRequest(email)
  {
    return this.http.post('/security/restore-password-request', {
      email: email
    });
  }

  verifyRecoveryKey(key)
  {
    return this.http.get('/security/validate-restore-password-key/' + key);
  }

  resetPassword(key: string, data: Object)
  {
    const payload = {...data, key: key};

    return this.http.put('/security/restore-password', payload)
  }
}
