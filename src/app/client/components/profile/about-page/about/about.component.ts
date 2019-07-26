import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import User from '../../../../../core/data/model/user.model';
import {ProfileService} from '../../../../services/profile.service';
import {NgForm} from '@angular/forms';
import {State} from '../../../../../app.state';
import {Store} from '@ngrx/store';
import {GlobalNotifyErrorMessage} from '../../../../../core/data/actions';
import {NotifyMessage} from '../../../../../core/data/model/notify-message.model';

@Component({
  selector: 'app-client-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  internalUser: any;
  _user: User;

  @Input('user')
  set user(value: User)
  {
    this._user = value;
    this.internalUser = {...value};
  }

  @Input() isEditable: boolean;

  @ViewChild('form') form: NgForm;
  @ViewChild('textField') textField: ElementRef;

  isEditing: boolean = false;
  userAbout: string;

  constructor(
      private store: Store<State>,
      private service: ProfileService) { }

  ngOnInit() {

  }

  onEndEditing(event)
  {
    this.isEditing = false;
    this.saveValue();
  }

  saveValue()
  {
    this.service.update(this.internalUser)
        .toPromise()
        .then(() => {
          this._user.aboutYourSelf = this.userAbout;
        })
        .catch((error) => {
          //console.log(error);
          //debugger
          const errorMessage = error.error['text'][0] ? error.error['text'][0].msg : 'Cannot edit this field!';
          this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(errorMessage)));
          this.internalUser = {...this._user};
        });
  }

  onEditClickHandler(event)
  {
    this.isEditing = true;

    event.stopPropagation();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent)
  {
    if (this.isEditing)
    {
      this.isEditing = false;
      this.internalUser = { ...this._user };
    }
  }

  @HostListener('document:click', ['$event']) onClickEventHandler(event: MouseEvent)
  {
    if (!this.isEditing)
    {
      return;
    }

    if (this.textField.nativeElement !== event.target)
    {
      this.isEditing = false;
      if (this.internalUser.aboutYourSelf != this._user.aboutYourSelf)
      {
        this.saveValue();
      }
    }
  }

}
