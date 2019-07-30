import * as actions from './practice-session.actions';
import {PracticeSession} from '../../core/data/model/practice-session.model';

export interface State {

  preInitialized: PracticeSession;
  preInitializedMediaType: string;
  lastInitialized: PracticeSession;
  lastEnded: PracticeSession;
  lastInProcess: PracticeSession;
  lastUnAnswered: PracticeSession;

}

const initialState: State = {

  preInitialized: null,
  preInitializedMediaType: null,
  lastInitialized: null,
  lastEnded: null,
  lastInProcess: null,
  lastUnAnswered: null,

};

export function reducer(state = initialState, action: actions.PracticeSessionActions): State {

  switch (action.type) {

    case actions.CLIENT_PRACTICE_SESSION_PRE_INITIALIZE:

      return {
        ...state,
        preInitialized: action.session,
        preInitializedMediaType: action.mediaType
      };

    case actions.CLIENT_PRACTICE_SESSION_INITIALIZED:

      return {
        ...state,
        lastInitialized: action.session
      };

    case actions.CLIENT_PRACTICE_SESSION_ENDED:

      return {
        ...state,
        lastEnded: action.session
      };

    case actions.CLIENT_PRACTICE_SESSION_IN_PROCESS:

      return {
        ...state,
        lastInProcess: action.session
      };

    case actions.CLIENT_PRACTICE_SESSION_UNANSWERED:

      return {
        ...state,
        lastUnAnswered: action.session
      };

    case actions.CLIENT_PRACTICE_SESSION_RESET:

      return {
        ...state,
        preInitialized: null,
        preInitializedMediaType: null,
        lastInitialized: null,
        lastEnded: null,
        lastInProcess: null,
        lastUnAnswered: null,
      };

    default:

      return state;

  }

}
