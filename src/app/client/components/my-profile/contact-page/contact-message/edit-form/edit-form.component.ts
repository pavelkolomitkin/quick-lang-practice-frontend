import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ContactMessage} from '../../../../../../core/data/model/contact-message.model';
import {NgForm} from '@angular/forms';
import {ContactMessageService} from '../../../../../services/contact-message.service';

@Component({
  selector: 'app-client-contact-message-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  @Output('onCancel') cancelEvent: EventEmitter<ContactMessage> = new EventEmitter();
  @Output('onEdit') editEvent: EventEmitter<ContactMessage> = new EventEmitter();

  @ViewChild('form') form: NgForm;

  _message: ContactMessage;
  errors: {} = {};

  @Input()
  set message(value: ContactMessage)
  {
    this._message = {...value};
  }

  constructor(
      private service: ContactMessageService
  ) { }

  ngOnInit() {

  }

  async onSaveClickHandler(event)
  {
    if (this.form.invalid)
    {
      return;
    }

    try {
      this._message = await this.service.update(this._message).toPromise();
      this.editEvent.emit(this._message);
    }
    catch ({ error: { errors } }) {

      this.errors = errors;

    }
  }

  onCancelClickHandler(event)
  {
    this.cancelEvent.emit(this._message);
  }

}
