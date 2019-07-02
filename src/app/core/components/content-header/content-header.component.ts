import { Component, OnInit } from '@angular/core';
import {State} from '../../../app.state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { BreadCrumb } from '../../data/model/bread-crumb.model';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {

  title: Observable<string>;
  subTitle: Observable<string>;

  breadCrumbs: Observable<Array<BreadCrumb>>;

  constructor(private store:Store<State>) {

    this.title = this.store.pipe(select(state => state.core.pageTitle));
    this.subTitle = this.store.pipe(select(state => state.core.pageSubTitle));

    this.breadCrumbs = this.store.pipe(select(state => state.core.breadCrumbs));
  }

  ngOnInit() {
  }

}
