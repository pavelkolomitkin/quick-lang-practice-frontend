import { Action } from '@ngrx/store';
import {PracticeSession} from '../../core/data/model/practice-session.model';

export const CLIENT_PRACTICE_SESSION_PRE_INITIALIZE = 'CLIENT_PRACTICE_SESSION_PRE_INITIALIZE';

export const CLIENT_PRACTICE_SESSION_INITIALIZED = 'CLIENT_PRACTICE_SESSION_INITIALIZED';
export const CLIENT_PRACTICE_SESSION_ENDED = 'CLIENT_PRACTICE_SESSION_ENDED';
export const CLIENT_PRACTICE_SESSION_IN_PROCESS = 'CLIENT_PRACTICE_SESSION_IN_PROCESS';
export const CLIENT_PRACTICE_SESSION_UNANSWERED = 'CLIENT_PRACTICE_SESSION_UNANSWERED';

export class ClientPracticeSessionPreInitialize implements Action
{
  readonly type = CLIENT_PRACTICE_SESSION_PRE_INITIALIZE;

  constructor(public session: PracticeSession) {}
}

export class ClientPracticeSessionInitialized implements Action
{
  readonly type = CLIENT_PRACTICE_SESSION_INITIALIZED;

  constructor(public session: PracticeSession) {}
}

export class ClientPracticeSessionEnded implements Action
{
  readonly type = CLIENT_PRACTICE_SESSION_ENDED;

  constructor(public session: PracticeSession) {}
}

export class ClientPracticeSessionInProcess implements Action
{
  readonly type = CLIENT_PRACTICE_SESSION_IN_PROCESS;

  constructor(public session: PracticeSession) {}
}

export class ClientPracticeSessionUnAnswered implements Action
{
  readonly type = CLIENT_PRACTICE_SESSION_UNANSWERED;

  constructor(public session: PracticeSession) {}
}

export type PracticeSessionActions = ClientPracticeSessionInitialized
  | ClientPracticeSessionPreInitialize
  | ClientPracticeSessionEnded
  | ClientPracticeSessionInProcess
  | ClientPracticeSessionUnAnswered
  ;
