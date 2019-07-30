import {Component, Input, OnInit} from '@angular/core';
import User from '../../../core/data/model/user.model';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-online-status-avatar',
  templateUrl: './online-status-avatar.component.html',
  styleUrls: ['./online-status-avatar.component.css']
})
export class OnlineStatusAvatarComponent implements OnInit {

  static ACTIVITY_STATUS_ONLINE = 'online';
  static ACTIVITY_STATUS_RECENTLY = 'recently';
  static ACTIVITY_STATUS_OFFLINE = 'offline';

  @Input() user: User;

  @Input() size: string;

  currentState: string;

  constructor() { }

  ngOnInit() {

    this.currentState = this.getActivityStatus();

  }

  getActivityStatus()
  {
    const { lastActivity } = this.user;

    if (!lastActivity)
    {
      return OnlineStatusAvatarComponent.ACTIVITY_STATUS_OFFLINE;
    }

    const lastActivityMoment = moment(lastActivity);
    const secondsDiff = moment().diff(lastActivityMoment, 'seconds');

    if (secondsDiff > environment.recentOnlineActivitySeconds)
    {
      return OnlineStatusAvatarComponent.ACTIVITY_STATUS_OFFLINE;
    }

    if (secondsDiff > environment.onlineActivitySeconds)
    {
      return OnlineStatusAvatarComponent.ACTIVITY_STATUS_RECENTLY;
    }

    return OnlineStatusAvatarComponent.ACTIVITY_STATUS_ONLINE;
  }

}
