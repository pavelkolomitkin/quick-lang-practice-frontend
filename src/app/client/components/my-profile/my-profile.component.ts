import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable} from 'rxjs';
import User from '../../../core/data/model/user.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: Observable<User>;


  constructor(
      private store: Store<State>,
  ) { }

  ngOnInit() {

    this.user = this.store.pipe(select(state => state.security.authorizedUser));

  }

}
