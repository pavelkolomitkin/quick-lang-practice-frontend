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
import {filter, first} from 'rxjs/operators';
import {MessagesSocketService} from '../../../sockets/messages-socket.service';
import {AddresseeTypingComponent} from '../../common/addressee-typing/addressee-typing.component';
import {ClientContactMessageReceivedReset, ClientUserClosedChat, ClientUserWatchingChat} from '../../../data/contact-message.actions';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit, OnDestroy {

  @ViewChild('messageContainer') messageContainer: ElementRef;
  @ViewChild('typingIndicator') typingIndicator: AddresseeTypingComponent;

  currentUser: User;

  messages: ContactMessage[] = [];
  earliestMessage: ContactMessage = null;

  addressee: User;
  addresseeContact: UserContact = null;
  infinityScrollDisabled: boolean = false;

  paramSubscription: Subscription;
  receivedMessageSubscription: Subscription;
  addresseeIsTypingSubscription: Subscription;
  iAmBlockedSubscription: Subscription;
  iAmUnblockedSubscription: Subscription;
  windowFocusChangeSubscription: Subscription;

  iAmBlocked: Boolean;
  iBlockedAddressee: Boolean;
  isWindowFocused: boolean;

  pageReady: boolean = false;

  constructor(
      private store: Store<State>,
      private profileService: ProfileService,
      private contactService: UserContactService,
      private messageService: ContactMessageService,
      private messageSocket: MessagesSocketService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  async ngOnInit() {

    // @ts-ignore
    this.currentUser = await this.store.pipe(select(state => state.security.authorizedUser), first()).toPromise();

    this.windowFocusChangeSubscription = this.store.pipe(select(state => state.core.isWindowFocused)).subscribe( async (isFocused) => {

      this.isWindowFocused = isFocused;

      if (this.isWindowFocused)
      {
        await this.readLastContactMessages();
      }

    });

    this.paramSubscription = this.route.params.subscribe(async (params) => {

      this.clearChatSubscriptions();

      if (this.currentUser.id === params['id'])
      {
        this.router.navigateByUrl('/client/profile/' + params['id']);
        return;
      }

      this.pageReady = false;
      this.messages = [];
      this.earliestMessage = null;

      try {
        this.addressee = await this.profileService.get(params['id']).toPromise();
      }
      catch (error) {

        //this.router.navigateByUrl('404');
        return
      }

      try {
        this.addresseeContact = await this.contactService.getContact(this.addressee).toPromise();
      }
      catch (error) {
        // console.log(error);
        // return
      }


      try {
        this.iAmBlocked = await this.profileService.amIBlockedBy(this.addressee).toPromise();
      }
      catch (error) {
        return
      }

      try {
        this.iBlockedAddressee = await this.profileService.isUserBlockedByMe(this.addressee).toPromise();
      }
      catch (error) {
        return
      }

      await this.loadMessages();
      await this.readLastContactMessages();

      const lastMessage = await this.store.pipe(select(state => state.clientContactMessage.lastReceivedMessage), first()).toPromise();
      if (lastMessage && (lastMessage.author.id === this.addressee.id))
      {
        this.store.dispatch(new ClientContactMessageReceivedReset());
      }

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
          .subscribe(async (message: ContactMessage) => {

            this.messages.push(message);
            if (!this.addresseeContact)
            {
              this.addresseeContact = await this.contactService.getContact(message.author).toPromise();
            }

            this.scrollDownList();

            if (this.isWindowFocused)
            {
              await this.readLastContactMessages();
            }

            if (message.author.id === this.addressee.id)
            {
              this.store.dispatch(new ClientContactMessageReceivedReset());
            }
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

      this.iAmBlockedSubscription = this.store.pipe(
        select(state => state.clientProfile.lastUserBlockedMe),
        filter(result => !!result),
        filter(result => (result.id === this.addressee.id))
      )
        .subscribe((addressee: User) => {
          this.iAmBlocked = true;
        });

      this.iAmUnblockedSubscription = this.store.pipe(
        select(state => state.clientProfile.lastUserUnBlockedMe),
        filter(result => !!result),
        filter(result => (result.id === this.addressee.id))
      )
        .subscribe((addressee: User) => {
            this.iAmBlocked = false;
          }
        );


      this.pageReady = true;
      this.store.dispatch(new ClientUserWatchingChat(this.addressee));
    });
  }

  clearChatSubscriptions()
  {
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

    if (this.iAmBlockedSubscription)
    {
      this.iAmBlockedSubscription.unsubscribe();
    }
    if (this.iAmUnblockedSubscription)
    {
      this.iAmUnblockedSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {

    this.paramSubscription.unsubscribe();
    this.windowFocusChangeSubscription.unsubscribe();

    this.clearChatSubscriptions();

    this.store.dispatch(new ClientUserClosedChat());
  }

  async readLastContactMessages()
  {
    if (this.addresseeContact)
    {
      await this.contactService.readLastMessages(this.addresseeContact).toPromise();
    }
  }

  async loadMessages()
  {
    if (!this.addresseeContact)
    {
      return;
    }

    this.infinityScrollDisabled = true;

    const list: ContactMessage[] = await this
        .messageService
        .getList(this.addresseeContact, this.earliestMessage ? this.earliestMessage.createdAt : null)
        .toPromise();

    if (list.length > 0)
    {
      this.earliestMessage = list[list.length - 1];
    }
    else {
      this.earliestMessage = null;
    }

    this.messages = list.reverse().concat(this.messages);

    this.infinityScrollDisabled = list.length === 0;
  }

  onScroll = async () => {

    await this.loadMessages();
  };

  async onMessageCreateHandler(message: ContactMessage)
  {
    this.messages.push(message);
    if (!this.addresseeContact)
    {
      this.addresseeContact = await this.contactService.getContact(this.addressee).toPromise();
    }

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
