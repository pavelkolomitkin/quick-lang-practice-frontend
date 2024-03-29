import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable} from 'rxjs';
import User from '../../../core/data/model/user.model';
import {ProfileService} from '../../services/profile.service';
import {first} from 'rxjs/operators';
import {GlobalNotifyErrorMessage} from '../../../core/data/actions';
import {NotifyMessage} from '../../../core/data/model/notify-message.model';
import {UserUpdated} from '../../../security/data/actions';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: Observable<User>;
  newMessageNumber: Observable<number>;

  constructor(
      private store: Store<State>,
  ) { }

  ngOnInit() {

    this.user = this.store.pipe(select(state => state.security.authorizedUser));
    this.newMessageNumber = this.store.pipe(select(state => state.clientProfile.newMessageNumber));
  }

}
