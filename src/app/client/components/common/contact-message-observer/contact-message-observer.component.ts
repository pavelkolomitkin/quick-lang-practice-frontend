import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesSocketService} from '../../../sockets/messages-socket.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Subscription} from 'rxjs';
import {ClientContactMessageEdited, ClientContactMessageReceived, ClientContactMessageRemoved} from '../../../data/contact-message.actions';
import {ContactMessage} from '../../../../core/data/model/contact-message.model';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';
import {ClientNewMessageToastComponent} from '../client-new-message-toast/client-new-message-toast.component';

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
      private socket: MessagesSocketService,
      private toastr: ToastrService,
  ) { }

  ngOnInit() {

      this.newMessageSubscription = this.socket.getNewMessage().subscribe(this.onNewMessageReceiveHandler);
      this.messageEditedSubscription = this.socket.getEditedMessage().subscribe(this.onMessageEditHandler)
      this.messageRemovedSubscription = this.socket.getRemovedMessage().subscribe(this.onMessageRemoved);
  }

  onNewMessageReceiveHandler = async (message: ContactMessage) =>
  {
      this.store.dispatch(new ClientContactMessageReceived(message));

      const openedContactChatAddressee = await this
          .store
          .pipe(select(state => state.clientContactMessage.currentContactChatAddressee), first())
          .toPromise();
      if (!openedContactChatAddressee || (openedContactChatAddressee.id !== message.author.id))
      {
        const toast = this.toastr.show('', '', {
          toastComponent: ClientNewMessageToastComponent,
          positionClass: 'toast-bottom-right',
          //disableTimeOut: true,
          toastClass: 'ngx-toastr ng-trigger ng-trigger-flyInOut client-new-message-toast'
        });

        // @ts-ignore
        toast.toastRef.componentInstance.contactMessage = message;
      }
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
