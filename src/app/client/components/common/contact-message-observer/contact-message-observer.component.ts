import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesSocketService} from '../../../sockets/messages-socket.service';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Subscription} from 'rxjs';
import {ClientContactMessageEdited, ClientContactMessageReceived, ClientContactMessageRemoved} from '../../../data/contact-message.actions';
import {ContactMessage} from '../../../../core/data/model/contact-message.model';

@Component({
  selector: 'app-client-message-receiver',
  templateUrl: './contact-message-observer.component.html',
  styleUrls: ['./contact-message-observer.component.css']
})
export class ContactMessageObserverComponent implements OnInit, OnDestroy {

  newMessageSubscription: Subscription;
  messageEditedSubscription: Subscription;
  messageRemovedSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private socket: MessagesSocketService
  ) { }

  ngOnInit() {

      this.newMessageSubscription = this.socket.getNewMessage().subscribe(this.onNewMessageReceiveHandler);
      this.messageEditedSubscription = this.socket.getEditedMessage().subscribe(this.onMessageEditHandler)
      this.messageRemovedSubscription = this.socket.getRemovedMessage().subscribe(this.onMessageRemoved);
  }

  onNewMessageReceiveHandler = (message: ContactMessage) =>
  {
      this.store.dispatch(new ClientContactMessageReceived(message));
  };

  onMessageEditHandler = (message: ContactMessage) => {
    this.store.dispatch(new ClientContactMessageEdited(message));
  };

  onMessageRemoved = (message: ContactMessage) => {
    this.store.dispatch(new ClientContactMessageRemoved(message));
  };

  ngOnDestroy(): void {

    this.newMessageSubscription.unsubscribe();
    this.messageEditedSubscription.unsubscribe();
    this.messageRemovedSubscription.unsubscribe();

  }

}
