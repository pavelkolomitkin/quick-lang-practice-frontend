
export class ConfirmationActionOption
{
    constructor(
        public label: string,
        public controlStyle: string = 'default',
        public callBackAction: Function = null
    ) {}
}
