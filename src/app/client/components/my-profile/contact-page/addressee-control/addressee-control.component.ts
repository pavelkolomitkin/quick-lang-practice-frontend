import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import User from '../../../../../core/data/model/user.model';
import {ProfileService} from '../../../../services/profile.service';
import {Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {GlobalNotifyErrorMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';

@Component({
  selector: 'app-client-addressee-control',
  templateUrl: './addressee-control.component.html',
  styleUrls: ['./addressee-control.component.css']
})
export class AddresseeControlComponent implements OnInit {

  @Input() addressee: User;

  @Input() isBlockedByMe: boolean;
  @Output() isBlockedByMeChange: EventEmitter<boolean> = new EventEmitter();

  @Input() amIBlocked: boolean;

  isLoading: boolean;

  constructor(
      private service: ProfileService,
      private store: Store<State>
  ) { }

  ngOnInit() {

  }

  async onBlockClickHandler(event)
  {
    this.isLoading = true;
    try {
      await this.service.blockProfile(this.addressee).toPromise();
      this.isBlockedByMe = true;
      this.isBlockedByMeChange.emit(this.isBlockedByMe);
    }
    catch (error) {
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Error of blocking this user!')));
    }

    this.isLoading = false;
  }

  async onUnBlockClickHandler(event)
  {
    this.isLoading = true;

    try {
      await this.service.unBlockProfile(this.addressee).toPromise();
      this.isBlockedByMe = false;
      this.isBlockedByMeChange.emit(this.isBlockedByMe);
    }
    catch (error) {
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Error of unblocking this user!')));
    }

    this.isLoading = false;
  }
}
