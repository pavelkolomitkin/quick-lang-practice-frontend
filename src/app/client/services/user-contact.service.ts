import {BaseService} from '../../core/services/base.service';
import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {UserContact} from '../../core/data/model/user-contact.model';
import {map} from 'rxjs/operators';
import User from '../../core/data/model/user.model';

@Injectable()
export class UserContactService extends BaseService
{
    getList(page: Number = 1)
    {
        const params: HttpParams = this.getHttpParamsFromObject({
            page
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

    changeBlockStatus(contact: UserContact, block: boolean)
    {
        return this.http.put('/client/contact/' + contact.id + '/' + (block ? 1 : 0), {});
    }

    readLastMessages(contact: UserContact)
    {
        return this.http.put('/client/contact/' + contact.id, {});
    }
}
