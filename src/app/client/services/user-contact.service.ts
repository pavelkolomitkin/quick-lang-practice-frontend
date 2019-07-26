import {BaseService} from '../../core/services/base.service';
import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {UserContact} from '../../core/data/model/user-contact.model';
import {map} from 'rxjs/operators';
import User from '../../core/data/model/user.model';

@Injectable()
export class UserContactService extends BaseService
{
    getList(lastDate: string)
    {
        const params: HttpParams = this.getHttpParamsFromObject({
          lastDate
        });

        return this.http.get<{ contacts: UserContact[] }>('/client/contact/list', { params })
            .pipe(
                map(({ contacts }) => {
                    return contacts;
                })
            );
    }

    getContact(addressee: User)
    {
        return this.http.get<{ contact: UserContact }>('/client/contact/' + addressee.id)
            .pipe(
                map(({ contact }) => contact)
            );
    }

    remove(contact: UserContact)
    {
        return this.http.delete<{ contact: UserContact }>('/client/contact/' + contact.id)
            .pipe(
                map(({ contact }) => {
                    return contact;
                })
            );
    }

    readLastMessages(contact: UserContact)
    {
        return this.http.put('/client/contact/' + contact.id + '/read', {});
    }

    getNewMessageNumber()
    {
        return this.http.get<{ number: number }>('/client/contact/new-message-number').pipe(
            map(({ number }) => number)
        );
    }
}
