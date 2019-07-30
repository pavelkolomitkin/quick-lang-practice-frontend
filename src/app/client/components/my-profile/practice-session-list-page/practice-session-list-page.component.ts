import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PracticeSessionService} from '../../../services/practice-session.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';
import User from '../../../../core/data/model/user.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-client-practice-session-list-page',
  templateUrl: './practice-session-list-page.component.html',
  styleUrls: ['./practice-session-list-page.component.css']
})
export class PracticeSessionListPageComponent implements OnInit, OnDestroy {

  list: PracticeSession[] = [];

  infinityScrollDisabled: boolean = false;
  earliestSession: PracticeSession = null;
  selectedStatus: string = null;

  pageReady: boolean = false;
  authorizedUser: User;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private service: PracticeSessionService,
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.authorizedUser), first()).toPromise();


    this.pageReady = false;
    this.list = [];
    this.earliestSession = null;

    await this.loadSessions();

    this.pageReady = true;
  }

  ngOnDestroy() {
  }

  async loadSessions()
  {
    this.infinityScrollDisabled = true;

    const list: PracticeSession[] = await this.service.getList(
      this.earliestSession ? this.earliestSession.createdAt : null,
      this.selectedStatus
    ).toPromise();

    if (list.length > 0)
    {
      this.earliestSession = list[list.length - 1];
    }

    this.list = this.list.concat(list);

    this.infinityScrollDisabled = list.length === 0;
  }

  onScroll = async () =>
  {
    await this.loadSessions();
  }
}
