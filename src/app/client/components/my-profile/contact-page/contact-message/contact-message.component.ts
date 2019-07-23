import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ContactMessage} from '../../../../../core/data/model/contact-message.model';
import {ContactMessageService} from '../../../../services/contact-message.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {GlobalNotifyErrorMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: '[app-client-contact-message]',
  templateUrl: './contact-message.component.html',
  styleUrls: ['./contact-message.component.css']
})
export class ContactMessageComponent implements OnInit, OnDestroy {


  @Output('onDelete') deleteEvent: EventEmitter<ContactMessage> = new EventEmitter();

  @Input() message: ContactMessage;

  @Input() isMine: boolean = false;

  isDeleted: boolean = false;

  deleteMessageSubscription: Subscription;

  constructor(
      private service: ContactMessageService,
      private store: Store<State>
  ) { }

  ngOnInit() {

    this.deleteMessageSubscription = this.store.pipe(
        select(state => state.clientContactMessage.lastRemovedMessage),
        filter(result => !!result),
        filter(result => result.id === this.message.id)
    ).subscribe((removedMessage: ContactMessage) => {

      this.isDeleted = true;

    });

  }

  ngOnDestroy(): void {

    this.deleteMessageSubscription.unsubscribe();

  }


  async onDeleteClickHandler(event)
  {
    try {
      await this.service.remove(this.message).toPromise();
      this.isDeleted = true;
      this.deleteEvent.emit(this.message);
    }
    catch ({ error: { errors } }) {
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Can not delete this message!')));
    }
  }
}
