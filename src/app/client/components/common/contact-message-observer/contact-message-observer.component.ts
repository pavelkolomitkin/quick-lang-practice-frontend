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
import {ClientNewMessageNumberChanged} from '../../../data/profile.actions';
import User from '../../../../core/data/model/user.model';

@Component({
  selector: 'app-client-message-receiver',
  templateUrl: './contact-message-observer.component.html',
  styleUrls: ['./contact-message-observer.component.css']
})
export class ContactMessageObserverComponent implements OnInit, OnDestroy {

  newMessageSubscription: Subscription;
  newMessageNumberSubscription: Subscription;
  messageEditedSubscription: Subscription;
  messageRemovedSubscription: Subscription;
  openedChatSubscription: Subscription;

  newMessageNumberTimeoutId: number = null;

  openedChat: User;

  constructor(
      private store: Store<State>,
      private socket: MessagesSocketService,
      private toastr: ToastrService,
  ) { }

  ngOnInit() {

      this.openedChatSubscription = this.store.pipe(select(state => state.clientContactMessage.currentContactChatAddressee)).subscribe((user: User) => {
          this.openedChat = user;
      });

      this.newMessageSubscription = this.socket.getNewMessage().subscribe(this.onNewMessageReceiveHandler);
      this.newMessageNumberSubscription = this.socket.getNewMessageNumber().subscribe(this.onNewMessageNumberHandler);
      this.messageEditedSubscription = this.socket.getEditedMessage().subscribe(this.onMessageEditHandler);
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

  onNewMessageNumberHandler = (value: number) => {

      if (this.newMessageNumberTimeoutId)
      {
          clearTimeout(this.newMessageNumberTimeoutId);
          this.newMessageNumberTimeoutId = null;
      }

      if (this.openedChat)
      {
          this.newMessageNumberTimeoutId = setTimeout(() => {

              this.store.dispatch(new ClientNewMessageNumberChanged(value));

          }, 2000);
      }
      else
      {
          this.store.dispatch(new ClientNewMessageNumberChanged(value));
      }
  };

  onMessageEditHandler = (message: ContactMessage) => {
    this.store.dispatch(new ClientContactMessageEdited(message));
  };

  onMessageRemoved = (message: ContactMessage) => {
    this.store.dispatch(new ClientContactMessageRemoved(message));
  };

  ngOnDestroy(): void {

    this.openedChatSubscription.unsubscribe();
    this.newMessageSubscription.unsubscribe();
    this.newMessageNumberSubscription.unsubscribe();
    this.messageEditedSubscription.unsubscribe();
    this.messageRemovedSubscription.unsubscribe();

  }

}
