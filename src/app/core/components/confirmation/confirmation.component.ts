import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {filter} from 'rxjs/operators';
import {ActionConfirmation} from '../../data/model/action-confirmation.model';
import {GlobalConfirmationResponse} from '../../data/actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  confirmations: Array<ActionConfirmation> = [];

  lastConfirmationSubscription: Subscription;

  constructor(private store: Store<State>) {

  }

  ngOnInit() {


    this.lastConfirmationSubscription = this.store.pipe(
        select(state => state.core.lastInitConfirmation),
        filter(result => result !== null)
    ).subscribe((confirmation: ActionConfirmation) => {
      this.confirmations.push(confirmation);
    });

  }

  ngOnDestroy(): void {
    this.lastConfirmationSubscription.unsubscribe();
  }

  onConfirmHandler(confirmation: ActionConfirmation)
  {
    confirmation.status = ActionConfirmation.HANDLED_STATUS;
    this.store.dispatch(new GlobalConfirmationResponse(confirmation));

    const index = this.confirmations.findIndex(item => item.id === confirmation.id);
    if (index !== -1)
    {
      this.confirmations.splice(index, 1);
    }
  }
}
