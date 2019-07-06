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

  confirmationSubscription: Subscription;

  constructor(private store: Store<State>) {


  }

  ngOnInit() {

    this.confirmationSubscription = this.store.pipe(
        select(state => state.core.lastInitConfirmation),
        filter(result => !!result)
      ).subscribe((confirmation: ActionConfirmation) => {

      this.confirmations.push(confirmation);

    });

  }

  ngOnDestroy(): void {

    this.confirmationSubscription.unsubscribe();

  }

  onConfirmHandler(confirmation: ActionConfirmation)
  {
    const index = this.confirmations.findIndex((item: ActionConfirmation) => {
      return (item === confirmation);
    });

    if (index !== -1)
    {
      this.confirmations.splice(index, 1);
    }
  }
}
