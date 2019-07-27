import User from './user.model';
import {PracticeSessionStatus} from './practice-session-status.model';
import {LanguageSkill} from './language-skill.model';

export class PracticeSession
{
  id: string;

  caller: User;

  callee: User;

  skill: LanguageSkill;

  progressStartTime: string;

  progressEndTime: string;

  status: PracticeSessionStatus;

}
