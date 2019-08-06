import { Action } from '@ngrx/store';
import {UserContact} from '../../core/data/model/user-contact.model';

export const CLIENT_USER_CONTACT_CREATED = 'CLIENT_USER_CONTACT_CREATED';
export const CLIENT_USER_CONTACT_NEW_MESSAGE = 'CLIENT_USER_CONTACT_NEW_MESSAGE';
export const CLIENT_USER_CONTACT_NEW_MESSAGE_RESET = 'CLIENT_USER_CONTACT_NEW_MESSAGE_RESET';
export const CLIENT_USER_CONTACT_MESSAGED_EDITED = 'CLIENT_USER_CONTACT_MESSAGED_EDITED';
export const CLIENT_USER_CONTACT_MESSAGED_EDITED_RESET = 'CLIENT_USER_CONTACT_MESSAGED_EDITED_RESET';
export const CLIENT_USER_CONTACT_MESSAGED_REMOVED = 'CLIENT_USER_CONTACT_MESSAGED_REMOVED';
export const CLIENT_USER_CONTACT_MESSAGED_REMOVED_RESET = 'CLIENT_USER_CONTACT_MESSAGED_REMOVED_RESET';


export class ClientUserContactCreated implements Action
{
  readonly type = CLIENT_USER_CONTACT_CREATED;

  constructor(public contact: UserContact) {};
}

export class ClientUserContactNewMessage implements Action
{
  readonly type = CLIENT_USER_CONTACT_NEW_MESSAGE;

  constructor(public contact: UserContact) {};
}

export class ClientUserContactNewMessageReset implements Action
{
  readonly type = CLIENT_USER_CONTACT_NEW_MESSAGE_RESET;
}

export class ClientUserContactMessageEdited implements Action
{
  readonly type = CLIENT_USER_CONTACT_MESSAGED_EDITED;

  constructor(public contact: UserContact) {};
}

export class ClientUserContactMessageEditedReset implements Action
{
  readonly type = CLIENT_USER_CONTACT_MESSAGED_EDITED_RESET;
}

export class ClientUserContactMessageRemoved implements Action
{
  readonly type = CLIENT_USER_CONTACT_MESSAGED_REMOVED;

  constructor(public contact: UserContact) {};
}

export class ClientUserContactMessageRemovedReset implements Action
{
  readonly type = CLIENT_USER_CONTACT_MESSAGED_REMOVED_RESET;
}

export type UserContactActions = ClientUserContactCreated
  | ClientUserContactNewMessage
  | ClientUserContactNewMessageReset
  | ClientUserContactMessageEdited
  | ClientUserContactMessageEditedReset
  | ClientUserContactMessageRemoved
  | ClientUserContactMessageRemovedReset
  ;
