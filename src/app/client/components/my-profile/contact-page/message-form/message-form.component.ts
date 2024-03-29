import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import User from '../../../../../core/data/model/user.model';
import {ContactMessageService} from '../../../../services/contact-message.service';
import {ContactMessage} from '../../../../../core/data/model/contact-message.model';
import {NgForm} from '@angular/forms';
import {MessagesSocketService} from '../../../../sockets/messages-socket.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-client-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit, OnDestroy {

  @Output('onMessageCreate') createMessageEvent: EventEmitter<ContactMessage> = new EventEmitter();

  @ViewChild('inputField') inputField: ElementRef;

  @Input() addressee: User;
  @Input() user: User;

  errors = {};


  constructor(
      private service: ContactMessageService,
      private store: Store<State>,
      private messageSocket: MessagesSocketService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

  async onSubmit(form: NgForm)
  {
    if (form.invalid)
    {
      return;
    }

    const { value: { text } } = form;

    let message = new ContactMessage();
    message.text = text;

    try {
      message = await this.service.create(message, this.addressee).toPromise();
      this.createMessageEvent.emit(message);

      form.reset();
      this.errors = {};
    }
    catch ({ error: { errors } }) {

      this.errors = errors;

    }
  }

  onTextChangeHandler(event)
  {
    this.messageSocket.sendTyping(this.addressee);
  }

}
