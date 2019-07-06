import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../app.state';
import {ConfirmationActionOption} from '../data/model/confirmation-action-option.model';
import {GlobalConfirmationInit} from '../data/actions';
import {ActionConfirmation} from '../data/model/action-confirmation.model';

@Injectable()
export class ConfirmActionService
{
    constructor(private store: Store<State>) {}

    confirm(title: string, message: string, options: Array<ConfirmationActionOption>)
    {
        this.store.dispatch(new GlobalConfirmationInit(new ActionConfirmation(
            title,
            message,
            options
        )));
    }
}
