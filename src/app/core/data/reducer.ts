import * as actions from './actions';
import {NotifyMessage} from "./model/notify-message.model";
import {ActionConfirmation} from './model/action-confirmation.model';
import {BreadCrumb} from './model/bread-crumb.model';

export interface State {
  globalProgressLoaders: number;

  lastSuccessMessage: NotifyMessage;
  lastWarningMessage: NotifyMessage;
  lastErrorMessage: NotifyMessage;

  lastInitConfirmation: ActionConfirmation;
  lastRespondedConfirmation: ActionConfirmation;

  pageTitle: string;
  pageSubTitle: string;

  breadCrumbs: Array<BreadCrumb>;

  leavePageConfirmation: boolean;

  isUserAgreementVisible: boolean;
}

const initialState: State = {
  globalProgressLoaders: 0,

  lastSuccessMessage: null,
  lastWarningMessage: null,
  lastErrorMessage: null,

  lastInitConfirmation: null,
  lastRespondedConfirmation: null,

  pageTitle: '',
  pageSubTitle: '',

  breadCrumbs: [],

  leavePageConfirmation: false,

  isUserAgreementVisible: false
};

export function reducer(state = initialState, action: actions.CoreActions): State {

  switch (action.type) {

    case actions.GLOBAL_PROGRESS_SHOW:

      return {
        ...state,
        globalProgressLoaders: state.globalProgressLoaders + 1
      };

    case actions.GLOBAL_PROGRESS_HIDE:

      let value: number;

      if (action.force || (state.globalProgressLoaders <= 1))
      {
        value = 0;
      }
      else
      {
        value = state.globalProgressLoaders - 1;
      }

      return {
        ...state,
        globalProgressLoaders: value
      };

    case actions.GLOBAL_NOTIFY_SUCCESS_MESSAGE:

      return {
        ...state,
        lastSuccessMessage: action.message
      };

    case actions.GLOBAL_NOTIFY_WARNING_MESSAGE:

      return {
        ...state,
        lastWarningMessage: action.message
      };

    case actions.GLOBAL_NOTIFY_ERROR_MESSAGE:

      return {
        ...state,
        lastErrorMessage: action.message
      };

    case actions.GLOBAL_CONFIRMATION_INIT:

      return {
        ...state,
        lastInitConfirmation: action.confirmation
      };

    case actions.GLOBAL_CONFIRMATION_RESPONSE:

      return {
        ...state,
        lastRespondedConfirmation: action.confirmation
      };

    case actions.GLOBAL_CONFIRMATION_RESET:

      return {
        ...state,
        lastInitConfirmation: null,
        lastRespondedConfirmation: null
      };

    case actions.GLOBAL_PAGE_TITLE:

      return {
        ...state,
        pageTitle: action.title,
        pageSubTitle: action.subTitle
      };

    case actions.GLOBAL_BREAD_CRUMBS:

      return {
        ...state,
        breadCrumbs: [...action.items]
      };

    case actions.GLOBAL_CONFIRM_LEAVE_PAGE_INIT:

      return {
        ...state,
        leavePageConfirmation: true
      };

    case actions.GLOBAL_CONFIRM_LEAVE_PAGE_RESET:

      return {
        ...state,
        leavePageConfirmation: false
      };

    case actions.GLOBAL_USER_AGREEMENT_VISIBILITY:

      return {
        ...state,
        isUserAgreementVisible: action.isVisible
      };

    default:

      return state;

  }

}
