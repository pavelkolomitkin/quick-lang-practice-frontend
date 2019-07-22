import {SocketService} from '../../core/services/socket.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ContactMessage} from '../../core/data/model/contact-message.model';
import User from '../../core/data/model/user.model';
import {Injectable} from '@angular/core';
import {BaseSocketService} from '../../core/services/base-socket.service';

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

}
