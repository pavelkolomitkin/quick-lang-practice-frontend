import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Observable} from 'rxjs';
import User from '../../../../core/data/model/user.model';

@Component({
  selector: 'app-client-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  user: Observable<User>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.user = this.store.pipe(select(state => state.security.authorizedUser));
  }

}
