import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import User from '../../../core/data/model/user.model';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent implements OnInit {

  _avatarUrl: string = null;

  _user: User;

  @Input() size: string;

  @Input()
  set user(user: User)
  {
    this._user = user;
    let avatar = '';

    const size = this.getSize();

    if (this._user.avatarThumbs && (this._user.avatarThumbs[size]))
    {
      avatar = this._user.avatarThumbs[size];
    }
    else {
      avatar = 'assets/picture/default_avatar.png';
    }

    this._avatarUrl = avatar;

    this.changeDetector.markForCheck();
  }

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  getSize()
  {
    let result = this.size;

    ['x-', 'm-'].forEach((prefix) => {

      if (result.indexOf(prefix) === 0)
      {
        result = result.slice(prefix.length);
      }

    });

    return result;
  }
}
