import * as actions from './profile.actions';
import User from '../../core/data/model/user.model';

export interface State {

    lastUserBlockedMe: User;

    lastUserUnBlockedMe: User;

    newMessageNumber: number;

}

const initialState: State = {

    lastUserBlockedMe: null,

    lastUserUnBlockedMe: null,

    newMessageNumber: 0,

};

export function reducer(state = initialState, action: actions.ProfileActions): State {

    switch (action.type) {

        case actions.CLIENT_PROFILE_USER_BLOCKED_ME:

            return {
                ...state,
                lastUserBlockedMe: action.user
            };

        case actions.CLIENT_PROFILE_USER_UNBLOCKED_ME:

            return {
                ...state,
                lastUserUnBlockedMe: action.user
            };

        case actions.CLIENT_NEW_MESSAGE_NUMBER_CHANGED:

            return {
                ...state,
                newMessageNumber: action.value
            };

        default:

            return state;

    }

}
