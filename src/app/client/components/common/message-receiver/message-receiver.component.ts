import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesSocket} from '../../../sockets/messages.socket';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Socket} from 'ngx-socket-io';
import {Subscription} from 'rxjs';
import {GlobalNotifyErrorMessage, GlobalNotifySuccessMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';

@Component({
  selector: 'app-client-message-receiver',
  templateUrl: './message-receiver.component.html',
  styleUrls: ['./message-receiver.component.css']
})
export class MessageReceiverComponent implements OnInit, OnDestroy {

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

          this.socket.on('new_message', this.onNewMessageReceiveHandler.bind(this));

        });

    /**
    this.service.once('connect', () => {
      console.log('Message receive is connected!');


      this.service.emit('test', 'hi');
    });

    // setInterval(() => {
    //
    //   this.service.emit('test', 'hi');
    //
    // }, 1000);

    this.service.on('test_receive', (data) => {
      console.log(data);
    });
  */
  }

  onNewMessageReceiveHandler(data: any)
  {
      //debugger
      const message = data.fullDocument;
      this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage(message.text)));
  }

  ngOnDestroy(): void {

    this.tokenSubscription.unsubscribe();

  }

}
