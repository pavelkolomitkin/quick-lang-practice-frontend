import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Observable} from 'rxjs';
import User from '../../../../core/data/model/user.model';
import {UserLogout} from '../../../../security/data/actions';

@Component({
  selector: 'app-client-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Observable<User>;

  constructor(private store: Store<State>) { }

  ngOnInit() {

    this.user = this.store.pipe(select(state => state.security.authorizedUser));

  }

  onLogoutClickHandler(event)
  {
    this.store.dispatch(new UserLogout());
  }

}
