import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesSocketService} from '../../../sockets/messages-socket.service';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Subscription} from 'rxjs';
import {ClientContactMessageReceived} from '../../../data/contact-message.actions';
import {ContactMessage} from '../../../../core/data/model/contact-message.model';

@Component({
  selector: 'app-client-message-receiver',
  templateUrl: './contact-message-observer.component.html',
  styleUrls: ['./contact-message-observer.component.css']
})
export class ContactMessageObserverComponent implements OnInit, OnDestroy {

  newMessageSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private socket: MessagesSocketService
  ) { }

  ngOnInit() {

      this.newMessageSubscription = this.socket.getNewMessage().subscribe(this.onNewMessageReceiveHandler);
  }

  onNewMessageReceiveHandler = (data: ContactMessage) =>
  {
      //debugger
      // const message = data.fullDocument;
      // this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage(message.text)));
      //console.log(data);

      this.store.dispatch(new ClientContactMessageReceived(data));
  }

  ngOnDestroy(): void {

    this.newMessageSubscription.unsubscribe();

  }

}
