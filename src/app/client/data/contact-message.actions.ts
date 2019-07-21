import { Action } from '@ngrx/store';
import {ContactMessage} from '../../core/data/model/contact-message.model';

export const CLIENT_CONTACT_MESSAGE_RECEIVED = 'CLIENT_CONTACT_MESSAGE_RECEIVED';
export const CLIENT_CONTACT_MESSAGE_EDITED = 'CLIENT_CONTACT_MESSAGE_EDITED';
export const CLIENT_CONTACT_MESSAGE_REMOVED = 'CLIENT_CONTACT_MESSAGE_REMOVED';


export class ClientContactMessageReceived implements Action
{
    readonly type = CLIENT_CONTACT_MESSAGE_RECEIVED;

    constructor(public message: ContactMessage) {}
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

export type ContactMessageActions = ClientContactMessageReceived
    | ClientContactMessageEdited
    | ClientContactMessageRemoved

    ;
