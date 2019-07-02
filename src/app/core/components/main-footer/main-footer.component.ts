import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GlobalUserAgreementVisibility} from '../../data/actions';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onAgreementClickHandler(event)
  {
    this.store.dispatch(new GlobalUserAgreementVisibility(true));
  }

}
