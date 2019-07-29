import User from './user.model';
import {PracticeSessionStatus} from './practice-session-status.model';
import {LanguageSkill} from './language-skill.model';

export class PracticeSession
{
  id?: string;

  caller: User;

  callerPeer: string;

  callee: User;

  calleePeer: string;

  skill: LanguageSkill;

  progressStartTime?: string;

  progressEndTime?: string;

  status?: PracticeSessionStatus;

}
