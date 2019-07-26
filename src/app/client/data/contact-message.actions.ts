import { Action } from '@ngrx/store';
import {ContactMessage} from '../../core/data/model/contact-message.model';
import {UserContact} from '../../core/data/model/user-contact.model';
import User from '../../core/data/model/user.model';

export const CLIENT_CONTACT_MESSAGE_RECEIVED = 'CLIENT_CONTACT_MESSAGE_RECEIVED';
export const CLIENT_CONTACT_MESSAGE_RECEIVED_RESET = 'CLIENT_CONTACT_MESSAGE_RECEIVED_RESET';
export const CLIENT_CONTACT_MESSAGE_EDITED = 'CLIENT_CONTACT_MESSAGE_EDITED';
export const CLIENT_CONTACT_MESSAGE_REMOVED = 'CLIENT_CONTACT_MESSAGE_REMOVED';

export const CLIENT_CONTACT_USER_WATCHING_CHAT = 'CLIENT_CONTACT_USER_WATCHING_CHAT';
export const CLIENT_CONTACT_USER_CLOSED_CHAT = 'CLIENT_CONTACT_USER_CLOSED_CHAT';

export class ClientContactMessageReceived implements Action
{
    readonly type = CLIENT_CONTACT_MESSAGE_RECEIVED;

    constructor(public message: ContactMessage) {}
}

export class ClientContactMessageReceivedReset implements Action
{
    readonly type = CLIENT_CONTACT_MESSAGE_RECEIVED_RESET;
}

export class ClientContactMessageEdited implements Action
{
    readonly type = CLIENT_CONTACT_MESSAGE_EDITED;

    constructor(public message: ContactMessage) {}
}

export class ClientContactMessageRemoved implements Action
{
    readonly type = CLIENT_CONTACT_MESSAGE_REMOVED;

    constructor(public message: ContactMessage) {}
}

export class ClientUserWatchingChat implements Action
{
    readonly type = CLIENT_CONTACT_USER_WATCHING_CHAT;

    constructor(public addressee: User) {}
}

export class ClientUserClosedChat implements Action
{
    readonly type = CLIENT_CONTACT_USER_CLOSED_CHAT;
}

export type ContactMessageActions = ClientContactMessageReceived
    | ClientContactMessageReceivedReset
    | ClientContactMessageEdited
    | ClientContactMessageRemoved

    | ClientUserWatchingChat
    | ClientUserClosedChat

    ;
