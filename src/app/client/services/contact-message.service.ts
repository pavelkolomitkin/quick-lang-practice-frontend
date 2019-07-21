import {BaseService} from '../../core/services/base.service';
import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {UserContact} from '../../core/data/model/user-contact.model';
import {ContactMessage} from '../../core/data/model/contact-message.model';
import {map} from 'rxjs/operators';
import User from '../../core/data/model/user.model';

@Injectable()
export class ContactMessageService extends BaseService
{
    getList(contact: UserContact, page: number = 1)
    {
        const params: HttpParams = this.getHttpParamsFromObject({
            page,
        });

        return this.http.get<{ messages: ContactMessage[] }>('/client/message/' + contact.id + '/list')
            .pipe(
                map(({ messages }) => {
                    return messages;
                })
            );
    }

    create(message: ContactMessage, addressee: User)
    {
        return this.http.post<{ message: ContactMessage }>('/client/message/' + addressee.id, {
            text: message.text
        })
            .pipe(
                map(({ message }) => {
                    return message;
                })
            );
    }

    update(message: ContactMessage)
    {
        return this.http.put<{ message: ContactMessage }>('/client/message/' + message.id, {
            text: message.text
        })
            .pipe(
                map(({ message }) => {
                    return message;
                })
            );
    }

    remove(message: ContactMessage)
    {
        return this.http.delete<{ message: ContactMessage }>('/client/message/' + message.id)
            .pipe(
                map(({ message }) => {
                    return message;
                })
            );
    }
}
