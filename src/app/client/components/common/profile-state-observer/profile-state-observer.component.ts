import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersSocketService} from '../../../sockets/users-socket.service';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import User from '../../../../core/data/model/user.model';
import {Subscription} from 'rxjs';
import {ClientProfileUserBlockedMe, ClientProfileUserUnBlockedMe} from '../../../data/profile.actions';

@Component({
  selector: 'app-client-profile-state-observer',
  templateUrl: './profile-state-observer.component.html',
  styleUrls: ['./profile-state-observer.component.css']
})
export class ProfileStateObserverComponent implements OnInit, OnDestroy {


  blockedByProfileSubscription: Subscription;
  unBlockedByProfileSubscription: Subscription;


  constructor(
      private socket: UsersSocketService,
      private store: Store<State>
  ) { }

  ngOnInit() {

    this.blockedByProfileSubscription = this.socket.getBlockedByUser().subscribe(this.blockedByUserHandler);
    this.unBlockedByProfileSubscription = this.socket.getUnBlockedByUser().subscribe(this.unBlockedByUserHandler);

  }

  ngOnDestroy(): void {

    this.blockedByProfileSubscription.unsubscribe();

  }

  blockedByUserHandler = (user: User) =>
  {
    this.store.dispatch(new ClientProfileUserBlockedMe(user));
  };

  unBlockedByUserHandler = (user: User) =>
  {
    this.store.dispatch(new ClientProfileUserUnBlockedMe(user));
  };
}
