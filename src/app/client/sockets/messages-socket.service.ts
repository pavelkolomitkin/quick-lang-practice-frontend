import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ContactMessage} from '../../core/data/model/contact-message.model';
import User from '../../core/data/model/user.model';
import {Injectable} from '@angular/core';
import {BaseSocketService} from '../../core/services/base-socket.service';
import {UserContact} from '../../core/data/model/user-contact.model';

@Injectable()
export class MessagesSocketService extends BaseSocketService
{
    getNamespace(): string {
        return 'messages';
    }

    private getMessageEvent(eventName: string)
    {
        return this
            .fromEvent(eventName)
            .pipe(
                map(data => <ContactMessage>data)
            );
    }

    getNewMessage(): Observable<ContactMessage>
    {
        return this.getMessageEvent('message_new');
    }

    getNewMessageNumber(): Observable<number>
    {
        return this.fromEvent('new_message_number');
    }

    getEditedMessage()
    {
        return this.getMessageEvent('message_edited');
    }

    getRemovedMessage()
    {
        return this.getMessageEvent('message_remove');
    }

    getTypingActivity()
    {
        return this
            .fromEvent('activity_typing')
            .pipe(
                map(data => <User>data)
            );
    }

    sendTyping(addressee: User)
    {
        this
            .emit('typing', {
                addresseeId: addressee.id
            });
    }

    getCreatedContact()
    {
      return this.fromEvent('user_contact_new')
        .pipe(
          map(data => <UserContact>data)
        );
    }

    getContactNewMessage()
    {
      return this.fromEvent('user_contact_new_message')
        .pipe(
        map(data => <UserContact>data)
      );
    }

    getContactWithEditedMessage()
    {
      return this.fromEvent('user_contact_message_edited').pipe(
        map(data => <UserContact>data)
      );
    }

    getContactWithDeletedMessage()
    {
      return this.fromEvent('user_contact_message_removed').pipe(
        map(data => <UserContact>data)
      );
    }

}
