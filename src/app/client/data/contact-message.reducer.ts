import * as actions from './contact-message.actions';
import {ContactMessage} from '../../core/data/model/contact-message.model';

export interface State {

    lastReceivedMessage: ContactMessage;

    lastEditedMessage: ContactMessage;

    lastRemovedMessage: ContactMessage;

}

const initialState: State = {

    lastReceivedMessage: null,

    lastEditedMessage: null,

    lastRemovedMessage: null

};

export function reducer(state = initialState, action: actions.ContactMessageActions): State {

    switch (action.type) {

        case actions.CLIENT_CONTACT_MESSAGE_RECEIVED:

            return {
                ...state,
                lastReceivedMessage: action.message
            };

        case actions.CLIENT_CONTACT_MESSAGE_EDITED:

            return {
                ...state,
                lastEditedMessage: action.message
            };

        case actions.CLIENT_CONTACT_MESSAGE_REMOVED:

            return {
                ...state,
                lastRemovedMessage: action.message
            };


        default:

            return state;

    }

}
