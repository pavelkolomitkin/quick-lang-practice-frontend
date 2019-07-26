import * as actions from './contact-message.actions';
import {ContactMessage} from '../../core/data/model/contact-message.model';
import User from '../../core/data/model/user.model';

export interface State {

    lastReceivedMessage: ContactMessage;

    lastEditedMessage: ContactMessage;

    lastRemovedMessage: ContactMessage;

    currentContactChatAddressee: User;

}

const initialState: State = {

    lastReceivedMessage: null,

    lastEditedMessage: null,

    lastRemovedMessage: null,

    currentContactChatAddressee: null,

};

export function reducer(state = initialState, action: actions.ContactMessageActions): State {

    switch (action.type) {

        case actions.CLIENT_CONTACT_MESSAGE_RECEIVED:

            return {
                ...state,
                lastReceivedMessage: action.message
            };

        case actions.CLIENT_CONTACT_MESSAGE_RECEIVED_RESET:

            return {
                ...state,
                lastReceivedMessage: null
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

        case actions.CLIENT_CONTACT_USER_WATCHING_CHAT:

            return {
                ...state,
                currentContactChatAddressee: action.addressee
            };

        case actions.CLIENT_CONTACT_USER_CLOSED_CHAT:

            return {
                ...state,
                currentContactChatAddressee: null
            };


        default:

            return state;

    }

}
