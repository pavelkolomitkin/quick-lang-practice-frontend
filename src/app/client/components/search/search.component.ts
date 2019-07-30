import { Component, OnInit } from '@angular/core';
import {Language} from '../../../core/data/model/language.model';
import {SearchPartnerService} from '../../services/search-partner.service';
import User from '../../../core/data/model/user.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {filter, first, map} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  pageReady: boolean = false;

  selectedLanguage: Language;

  list: User[] = [];
  currentPage: number = 1;

  infinityScrollDisabled: boolean = false;


  constructor(
    private service: SearchPartnerService,
    private store: Store<State>
  ) { }

  async ngOnInit() {

    this.pageReady = false;

    const languages = await this.store.pipe(select(state => state.core.languages), first()).toPromise();
    this.selectedLanguage = languages.find(language => language.code === 'EN');

    this.list = [];
    this.currentPage = 1;
    await this.loadUsers();

    this.pageReady = true
  }

  async onLanguageSelectHandler(language: Language)
  {
    this.selectedLanguage = language;
    this.currentPage = 1;
    this.list = [];

    await this.loadUsers();
  }

  async loadUsers()
  {
    if (this.selectedLanguage)
    {
      const list: User[] = await this.service.getList(this.selectedLanguage, this.currentPage).toPromise();
      this.list = this.list.concat(list);
    }
  }

  async onScroll()
  {
    this.currentPage++;
    await this.loadUsers();
  }
}
