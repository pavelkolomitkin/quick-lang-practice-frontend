import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import RegisterData from "../../data/model/register-data.model";
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GlobalUserAgreementVisibility} from '../../../core/data/actions';
import {Observable} from 'rxjs';
import {Language} from '../../../core/data/model/language.model';
import {LanguageLevel} from '../../../core/data/model/language-level.model';
import {first} from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() validationErrors:any = {
    plainPassword: {}
  };

  @Output('onSubmit') onSubmitEvent: EventEmitter<RegisterData> = new EventEmitter();

  languages: Language[];
  languageLevels: LanguageLevel[];

  selectedLanguage: Language;
  selectedLevel: LanguageLevel;

  constructor(private store: Store<State>) { }

  async ngOnInit() {

    this.languages = await this.store.pipe(select(state => state.core.languages), first()).toPromise();
    this.languageLevels = await this.store.pipe(select(state => state.core.languageLevels), first()).toPromise();

    this.selectedLanguage = this.languages.find(item => item.code === 'EN');
    this.selectedLevel = this.languageLevels.find(level => level.level === LanguageLevel.BEGINNER_LEVEL);
  }

  onSubmit(form:NgForm)
  {
    const { email, fullName, password, passwordRepeat } = form.value;

    const data: RegisterData = {
      email: email,
      fullName: fullName,
      password: password,
      passwordRepeat: passwordRepeat,
      language: this.selectedLanguage,
      languageLevel: this.selectedLevel
    };

    this.onSubmitEvent.emit(data);
  }

  compareEntity(a: any, b: any)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }
}
