import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import User from '../../../../../core/data/model/user.model';
import {ContactMessageService} from '../../../../services/contact-message.service';
import {ContactMessage} from '../../../../../core/data/model/contact-message.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-client-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  @Output('onMessageCreate') createMessageEvent: EventEmitter<ContactMessage> = new EventEmitter();

  @ViewChild('inputField') inputField: ElementRef;

  @Input() addressee: User;

  errors = {};

  constructor(
      private service: ContactMessageService
  ) { }

  ngOnInit() {

  }

  async onSubmit(form: NgForm)
  {
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

}
