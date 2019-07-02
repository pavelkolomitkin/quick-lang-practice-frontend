import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LeavePageConfirmationInterface} from '../../data/model/leave-page-confirmation.interface';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';

@Injectable()
export class ConfirmLeavePageGuardService implements CanDeactivate<any>
{
    static DEFAULT_PROMPT_MESSAGE = 'Do you want to leave this page';

    needToConfirm: boolean = false;

    constructor(private store: Store<State>)
    {
        this.store.pipe(select(state => state.core.leavePageConfirmation)).subscribe(
            (value) => {
                this.needToConfirm = value;
            }
        )
    }

    canDeactivate(
        component: any,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {

        if (this.needToConfirm)
        {
            let message = ConfirmLeavePageGuardService.DEFAULT_PROMPT_MESSAGE;
            if (!!(component as LeavePageConfirmationInterface).getPromptMessage && (!!component.getPromptMessage()))
            {
                message = component.getPromptMessage()
            }

            return confirm(message + '?');

            // return this.translator.get(message).toPromise().then((message) => {
            //     return confirm(message + '?');
            // });
        }

        return true;
    }

}
