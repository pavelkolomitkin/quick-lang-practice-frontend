import * as actions from './profile.actions';
import User from '../../core/data/model/user.model';

export interface State {

    lastUserBlockedMe: User;

    lastUserUnBlockedMe: User;

}

const initialState: State = {

    lastUserBlockedMe: null,

    lastUserUnBlockedMe: null

};

export function reducer(state = initialState, action: actions.ProfileActions): State {

    switch (action.type) {

        case actions.CLIENT_PROFILE_USER_BLOCKED_ME:

            return {
                ...state,
                lastUserBlockedMe: action.user
            };

            break;

        case actions.CLIENT_PROFILE_USER_UNBLOCKED_ME:

            return {
                ...state,
                lastUserUnBlockedMe: action.user
            };


            break;

        default:

            return state;

    }

}
