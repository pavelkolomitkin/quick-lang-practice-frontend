import * as actions from './user-contact.actions';
import {UserContact} from '../../core/data/model/user-contact.model';

export interface State {

  lastContactCreated: UserContact,
  lastContactAddedMessage: UserContact,
  lastContactEditedMessage: UserContact,
  lastContactRemovedMessage: UserContact

}

const initialState: State = {

  lastContactCreated: null,
  lastContactAddedMessage: null,
  lastContactEditedMessage: null,
  lastContactRemovedMessage: null,
};

export function reducer(state = initialState, action: actions.UserContactActions): State {

  switch (action.type) {

    case actions.CLIENT_USER_CONTACT_CREATED:

      return {
        ...state,
        lastContactCreated: action.contact
      };

    case actions.CLIENT_USER_CONTACT_NEW_MESSAGE:

      return {
        ...state,
        lastContactAddedMessage: action.contact
      };

    case actions.CLIENT_USER_CONTACT_NEW_MESSAGE_RESET:

      return {
        ...state,
        lastContactAddedMessage: null
      };

    case actions.CLIENT_USER_CONTACT_MESSAGED_EDITED:

      return {
        ...state,
        lastContactEditedMessage: action.contact
      };

    case actions.CLIENT_USER_CONTACT_MESSAGED_EDITED_RESET:

      return {
        ...state,
        lastContactEditedMessage: null
      };

    case actions.CLIENT_USER_CONTACT_MESSAGED_REMOVED:

      return {
        ...state,
        lastContactRemovedMessage: action.contact
      };

    case actions.CLIENT_USER_CONTACT_MESSAGED_REMOVED_RESET:

      return {
        ...state,
        lastContactRemovedMessage: null
      };

    default:

      return  state;

  }

}
