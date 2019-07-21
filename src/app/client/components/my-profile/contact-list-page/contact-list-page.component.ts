import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserContact} from '../../../../core/data/model/user-contact.model';
import {UserContactService} from '../../../services/user-contact.service';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.css']
})
export class ContactListPageComponent implements OnInit, OnDestroy {

  contacts: UserContact[] = [];
  total: number = null;
  contactPageNumber: number = 1;

  infinityScrollDisabled: boolean = false;

  constructor(
      private store: Store<State>,
      private service: UserContactService,
  ) { }

  async ngOnInit() {

    this.contactPageNumber = 1;
     await this.loadContacts();
  }

  ngOnDestroy() {

  }

  async loadContacts()
  {
    const contacts = await this.service.getList(this.contactPageNumber).toPromise();

    this.contacts = this.contacts.concat(contacts);
  }

  onScroll = async () => {

    this.contactPageNumber++;

    await this.loadContacts();
  };

}
