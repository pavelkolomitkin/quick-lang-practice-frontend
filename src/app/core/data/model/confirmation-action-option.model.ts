
export class ConfirmationActionOption
{
    static CONFIRM_ID = '1';
    static CANCEL_ID = '2';

    constructor(
        public id: string,
        public label: string,
        public controlStyle: string = 'default'
    ) {}
}
