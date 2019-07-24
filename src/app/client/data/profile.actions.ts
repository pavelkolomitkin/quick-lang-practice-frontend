import { Action } from '@ngrx/store';
import User from '../../core/data/model/user.model';

export const CLIENT_PROFILE_USER_BLOCKED_ME = 'CLIENT_PROFILE_USER_BLOCKED_ME';
export const CLIENT_PROFILE_USER_UNBLOCKED_ME = 'CLIENT_PROFILE_USER_UNBLOCKED_ME';

export class ClientProfileUserBlockedMe implements Action
{
    readonly type = CLIENT_PROFILE_USER_BLOCKED_ME;

    constructor(public user: User) {}
}

export class ClientProfileUserUnBlockedMe implements Action
{
    readonly type = CLIENT_PROFILE_USER_UNBLOCKED_ME;

    constructor(public user: User) {}
}

export type ProfileActions = ClientProfileUserBlockedMe
    | ClientProfileUserUnBlockedMe
    ;
