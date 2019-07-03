import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable} from 'rxjs';
import User from '../../data/model/user.model';

@Component({
  selector: '[app-main-menu]',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit {

  user: Observable<User>;


  constructor(private store:Store<State>)
  {
    this.user = this.store.pipe(select(state => state.security.authorizedUser));

  }

  ngOnInit() {
  }

}
