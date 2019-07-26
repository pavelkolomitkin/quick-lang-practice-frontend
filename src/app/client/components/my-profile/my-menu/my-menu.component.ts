import {Component, Input, OnInit} from '@angular/core';
import User from '../../../../core/data/model/user.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-client-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.css']
})
export class MyMenuComponent implements OnInit {

  user: Observable<User>;
  newMessageNumber: Observable<number>;

  constructor(
      private store: Store<State>
  ) { }

  ngOnInit() {

    this.user = this.store.pipe(select(state => state.security.authorizedUser));
    this.newMessageNumber = this.store.pipe(select(state => state.clientProfile.newMessageNumber));
  }

}
