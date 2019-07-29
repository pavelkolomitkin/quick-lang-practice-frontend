export const PracticeSessionStatusCodes = {
  INITIALIZED: 'initialized',
  UNANSWERED: 'unAnswered',
  IN_PROCESS: 'inProcess',
  ENDED: 'ended'
};

export class PracticeSessionStatus
{
  id: number;

  code: string;

  title: string;
}
