import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {UserContact} from '../../../../../core/data/model/user-contact.model';
import {UserContactService} from '../../../../services/user-contact.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {GlobalNotifyErrorMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';
import {ConfirmActionService} from '../../../../../core/services/confirm-action.service';
import {ConfirmationActionOption} from '../../../../../core/data/model/confirmation-action-option.model';
import {MessagesSocketService} from '../../../../sockets/messages-socket.service';
import User from '../../../../../core/data/model/user.model';
import {Subscription} from 'rxjs';
import {AddresseeTypingComponent} from '../../../common/addressee-typing/addressee-typing.component';
import {first} from 'rxjs/operators';

@Component({
  selector: '[app-client-contact-item]',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
})
export class ContactItemComponent implements OnInit, OnDestroy {

  @ViewChild('typingComponent') typing: AddresseeTypingComponent;

  @Output('onDelete') deleteEvent: EventEmitter<UserContact> = new EventEmitter();

  @Input() contact: UserContact;

  authorizedUser: User;

  addresseeIsTypingSubscription: Subscription;

  constructor(
    private service: UserContactService,
    private store: Store<State>,
    private confirmationService: ConfirmActionService,
    private messageSocket: MessagesSocketService,
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.authorizedUser), first()).toPromise();

    this.addresseeIsTypingSubscription = this.messageSocket.getTypingActivity().subscribe((addressee: User) => {
      if (this.contact.addressee.id === addressee.id)
      {
        this.typing.setVisible();
      }
    })
  }

  ngOnDestroy(): void {
    this.addresseeIsTypingSubscription.unsubscribe();
  }


  async onRemoveClickHandler(event)
  {
    event.stopPropagation();

    this.confirmationService.confirm(
      'Remove the contact?',
      'Are you sure you want to remove the contact with ' + this.contact.addressee.fullName + '?',
      [
        new ConfirmationActionOption('Remove', 'danger', async () => {
          try {
            await this.service.remove(this.contact).toPromise();
            this.deleteEvent.emit(this.contact);
          }
          catch (error) {
            this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Can not delete it!')));
          }

        }),
        new ConfirmationActionOption('Cancel')
      ]);


  }

}
