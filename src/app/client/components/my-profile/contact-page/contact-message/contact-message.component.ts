import {Component, Input, OnInit} from '@angular/core';
import {ContactMessage} from '../../../../../core/data/model/contact-message.model';

@Component({
  selector: '[app-client-contact-message]',
  templateUrl: './contact-message.component.html',
  styleUrls: ['./contact-message.component.css']
})
export class ContactMessageComponent implements OnInit {

  @Input() message: ContactMessage;

  @Input() isMine: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
