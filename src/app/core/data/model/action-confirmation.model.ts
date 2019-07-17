import {ConfirmationActionOption} from './confirmation-action-option.model';

export class ActionConfirmation
{
    static NEW_STATUS = 0;
    static HANDLED_STATUS = 1;

    private _userResponse: ConfirmationActionOption = null;

    constructor(
        public title: string,
        public message:string,
        public userActions: Array<ConfirmationActionOption> = [],
    )
    {
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
