import {Component, Input, OnInit} from '@angular/core';
import User from '../../../../core/data/model/user.model';
import {GlobalNotifyErrorMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ProfileService} from '../../../services/profile.service';
import {UserUpdated} from '../../../../security/data/actions';

@Component({
  selector: 'app-client-editable-name',
  templateUrl: './editable-name.component.html',
  styleUrls: ['./editable-name.component.css']
})
export class EditableNameComponent implements OnInit {

  @Input() user: User;

  isEditingFullName: boolean = false;
  fullNameValue: string;

  constructor(
    private store: Store<State>,
    private service: ProfileService
  ) { }

  ngOnInit() {
  }

  onEditFullNameClickHandler(event)
  {
    this.fullNameValue = this.user.fullName;
    this.isEditingFullName = true;
  }

  async onFullNameTextBlurHandler(event)
  {
    this.isEditingFullName = false;
    const value = this.fullNameValue.trim();
    if (value === '')
    {
      return;
    }

    let clonedUser = {...this.user};
    clonedUser.fullName = value;

    try {

      // @ts-ignore
      await this.service.update(clonedUser).toPromise();
      this.user.fullName = clonedUser.fullName;
      this.store.dispatch(new UserUpdated(User.createFromRawData({...this.user})));
    }
    catch ({ error: { errors } }) {

      const errorMessage = (errors['fullName'] && (errors['fullName'].length > 0)) ? errors['fullName'][0] : 'Error';
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(errorMessage)));

    }

  }
}
