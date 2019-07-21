import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesSocket} from '../../../sockets/messages.socket';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Socket} from 'ngx-socket-io';
import {Subscription} from 'rxjs';
import {GlobalNotifyErrorMessage, GlobalNotifySuccessMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';
import {ClientContactMessageReceived} from '../../../data/contact-message.actions';
import {ContactMessage} from '../../../../core/data/model/contact-message.model';

@Component({
  selector: 'app-client-message-receiver',
  templateUrl: './contact-message-observer.component.html',
  styleUrls: ['./contact-message-observer.component.css']
})
export class ContactMessageObserverComponent implements OnInit, OnDestroy {

  private socket: Socket;

  tokenSubscription: Subscription;

  constructor(
      private store: Store<State>,
  ) { }

  ngOnInit() {

    this.tokenSubscription = this.store.pipe(select(state => state.security.authorizedToken)).subscribe(
        (token: string) => {

          if (this.socket)
          {
            this.socket.disconnect();
            this.socket = null;
          }

          if (!token)
          {
            // dispose the internal state
            return;
          }

          this.socket = new Socket({
            url: 'http://localhost:3000/messages',
            options: {
              query: "token=" + token
            }
          });

          this.socket.on('message_new', this.onNewMessageReceiveHandler.bind(this));

        });
  }

  onNewMessageReceiveHandler(data: any)
  {
      //debugger
      // const message = data.fullDocument;
      // this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage(message.text)));
      console.log(data);

      this.store.dispatch(new ClientContactMessageReceived(<ContactMessage>data));
  }

  ngOnDestroy(): void {

    this.tokenSubscription.unsubscribe();

  }

}
