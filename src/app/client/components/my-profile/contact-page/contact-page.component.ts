import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ContactMessage} from '../../../../core/data/model/contact-message.model';
import {ContactMessageService} from '../../../services/contact-message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserContactService} from '../../../services/user-contact.service';
import {UserContact} from '../../../../core/data/model/user-contact.model';
import {ProfileService} from '../../../services/profile.service';
import User from '../../../../core/data/model/user.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MessagesSocketService} from '../../../sockets/messages-socket.service';
import {AddresseeTypingComponent} from './addressee-typing/addressee-typing.component';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit, OnDestroy {

  @ViewChild('messageContainer') messageContainer: ElementRef;
  @ViewChild('typingIndicator') typingIndicator: AddresseeTypingComponent;

  currentUser: Observable<User>;

  currentMessagePage: number = 1;
  messages: ContactMessage[] = [];

  addressee: User;
  addresseeContact: UserContact = null;

  paramSubscription: Subscription;
  receivedMessageSubscription: Subscription;
  addresseeIsTypingSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private profileService: ProfileService,
      private contactService: UserContactService,
      private messageService: ContactMessageService,
      private messageSocket: MessagesSocketService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.currentUser = this.store.pipe(select(state => state.security.authorizedUser));

    this.paramSubscription = this.route.params.subscribe(async (params) => {

      try {
        this.addressee = await this.profileService.get(params['id']).toPromise();
      }
      catch (error) {
        console.log(error);
        //this.router.navigateByUrl('404');
        return
      }

      try {
        this.addresseeContact = await this.contactService.getContact(this.addressee).toPromise();
      }
      catch (error) {
        console.log(error);
        return
      }


      this.currentMessagePage = 1;
      await this.loadMessages();

      if (this.receivedMessageSubscription)
      {
        this.receivedMessageSubscription.unsubscribe();
        this.receivedMessageSubscription = null;
      }
      this.receivedMessageSubscription = this.store.pipe(
          select(state => state.clientContactMessage.lastReceivedMessage),
          filter(result => !!result),
          filter(result => result.author.id === this.addressee.id)
          )
          .subscribe((message: ContactMessage) => {

            this.messages.push(message);
            this.scrollDownList();

          });


      this.scrollDownList();

      if (this.addresseeIsTypingSubscription)
      {
        this.addresseeIsTypingSubscription.unsubscribe();
      }
      this.addresseeIsTypingSubscription = this.messageSocket.getTypingActivity().subscribe((writingUser: User) => {
        //debugger
        if (writingUser.id === this.addressee.id)
        {
            this.typingIndicator.setVisible();
        }
      });
    });


  }

  ngOnDestroy() {

    this.paramSubscription.unsubscribe();
    if (this.receivedMessageSubscription)
    {
      this.receivedMessageSubscription.unsubscribe();
      this.receivedMessageSubscription = null;
    }

    if (this.addresseeIsTypingSubscription)
    {
      this.addresseeIsTypingSubscription.unsubscribe();
      this.addresseeIsTypingSubscription = null;
    }
  }

  async loadMessages()
  {

    const list: ContactMessage[] = await this.messageService.getList(this.addresseeContact, this.currentMessagePage).toPromise();

    this.messages = this.messages.concat(list);

  }

  onMessageCreateHandler(message: ContactMessage)
  {
    this.messages.push(message);
    this.scrollDownList();
  }

  scrollDownList()
  {
    setTimeout(() => {
      const { nativeElement } = this.messageContainer;

      nativeElement.scrollTop = nativeElement.scrollHeight;
    }, 10);
  }

}
