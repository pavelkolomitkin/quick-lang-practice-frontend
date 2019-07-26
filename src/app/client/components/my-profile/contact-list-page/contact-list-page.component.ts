import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserContact} from '../../../../core/data/model/user-contact.model';
import {UserContactService} from '../../../services/user-contact.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ClientUserContactNewMessageReset} from '../../../data/user-contact.actions';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.css']
})
export class ContactListPageComponent implements OnInit, OnDestroy {

  pageReady: boolean = false;

  contacts: UserContact[] = [];
  lastContactUpdatedAt: string = null;

  infinityScrollDisabled: boolean = false;

  contactNewMessageSubscription: Subscription;
  contactModifiedMessageSubscription: Subscription;
  contactRemovedMessageSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private service: UserContactService,
      private router: Router
  ) { }

  async ngOnInit() {

    this.contacts = [];
    this.store.dispatch(new ClientUserContactNewMessageReset());

    await this.loadContacts();

    this.contactNewMessageSubscription = this.store.pipe(
      select(state => state.clientUserContact.lastContactAddedMessage),
      filter(result => !!result)
    ).subscribe((contact: UserContact) => {

      this.moveContactAtTop(contact);
      this.store.dispatch(new ClientUserContactNewMessageReset());
    });

    this.contactModifiedMessageSubscription = this.store.pipe(
      select(state => state.clientUserContact.lastContactEditedMessage),
      filter(result => !!result)
    ).subscribe((contact: UserContact) => {

      this.replaceContact(contact);

    });

    this.contactRemovedMessageSubscription = this.store.pipe(
      select(state => state.clientUserContact.lastContactRemovedMessage),
      filter(result => !!result)
    ).subscribe((contact: UserContact) => {

      this.replaceContact(contact);

    });


    this.pageReady = true;
  }

  ngOnDestroy() {

    this.contactNewMessageSubscription.unsubscribe();
    this.contactModifiedMessageSubscription.unsubscribe();
    this.contactRemovedMessageSubscription.unsubscribe();

  }

  async loadContacts()
  {
    const contacts = await this.service.getList(this.lastContactUpdatedAt).toPromise();

    if (contacts.length > 0)
    {
      this.lastContactUpdatedAt = contacts[contacts.length - 1].lastMessageAddedAt;
    }

    this.contacts = this.contacts.concat(contacts);
  }

  onScroll = async () => {
    await this.loadContacts();
  };

  onContactClickHandler(contact: UserContact)
  {
    this.router.navigateByUrl('/client/profile/contacts/' + contact.addressee.id);
  }

  onContactDeleteHandler(contact: UserContact)
  {
    const index = this.contacts.findIndex((item) => item.id === contact.id);
    if (index !== -1)
    {
      this.contacts.splice(index, 1);
    }
  }

  moveContactAtTop(contact: UserContact)
  {
    const index = this.contacts.findIndex(item => item.id === contact.id);
    if (index !== -1)
    {
      this.contacts.splice(index, 1);
    }

    this.contacts.unshift(contact);
  }

  replaceContact(contact: UserContact)
  {
    const index = this.contacts.findIndex(item => item.id === contact.id);
    if (index !== -1)
    {
      this.contacts[index] = contact;
    }
  }

}
