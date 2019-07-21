import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserContact} from '../../../../../core/data/model/user-contact.model';

@Component({
  selector: '[app-client-contact-item]',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactItemComponent implements OnInit {

  @Output('onDelete') deleteEvent: EventEmitter<UserContact> = new EventEmitter();

  @Input() contact: UserContact;

  constructor() { }

  ngOnInit() {



  }

}
