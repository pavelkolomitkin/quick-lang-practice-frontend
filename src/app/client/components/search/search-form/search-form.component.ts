import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Language} from '../../../../core/data/model/language.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';

@Component({
  selector: 'app-client-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output('onLanguageSelect') languageSelectEvent: EventEmitter<Language> = new EventEmitter<Language>();

  languages: Observable<Array<Language>>;
  @Input() selectedLanguage: Language;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {

    this.languages = this.store.pipe(select(state => state.core.languages));

  }

  compareEntity(a: any, b: any)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

  onLanguageSelectHandler(event)
  {
    this.languageSelectEvent.emit(this.selectedLanguage);
  }
}
