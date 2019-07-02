import {ConfirmationActionOption} from './confirmation-action-option.model';

export class ActionConfirmation
{
    static NEW_STATUS = 0;
    static HANDLED_STATUS = 1;

    private _status: number;
    private _userResponse: ConfirmationActionOption = null;

    constructor(
        public id: string,
        public title: string,
        public message:string,
        public userActions: Array<ConfirmationActionOption> = [],
        public payload: any = null
    )
    {
        this.status = ActionConfirmation.NEW_STATUS;
    }

    get status()
    {
        return this._status;
    }

    set status(value: number)
    {
        this._status = value;
    }

    get userResponse(): ConfirmationActionOption
    {
        return this._userResponse;
    }

    set userResponse(value: ConfirmationActionOption)
    {
        this._userResponse = value;
    }
}
