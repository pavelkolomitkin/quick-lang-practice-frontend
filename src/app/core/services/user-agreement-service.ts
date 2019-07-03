import {BaseService} from './base.service';
import {HttpHeaders} from '@angular/common/http';

export class UserAgreementService extends BaseService
{
    get()
    {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'text/html; charset=UTF-8',
            'Accept': 'text/html'
        });

        return this.http.get('/user-agreement', {
            headers, responseType: 'text'
        });
    }
}