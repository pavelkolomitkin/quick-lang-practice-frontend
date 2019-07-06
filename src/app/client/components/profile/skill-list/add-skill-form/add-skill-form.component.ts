import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Language} from '../../../../../core/data/model/language.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {LanguageLevel} from '../../../../../core/data/model/language-level.model';
import {LanguageSkill} from '../../../../../core/data/model/language-skill.model';
import {NgForm} from '@angular/forms';
import {ProfileService} from '../../../../services/profile.service';

@Component({
  selector: 'app-client-add-skill-form',
  templateUrl: './add-skill-form.component.html',
  styleUrls: ['./add-skill-form.component.css']
})
export class AddSkillFormComponent implements OnInit {

  @Output('onCreate') createEvent: EventEmitter<LanguageSkill> = new EventEmitter();

  languages: Observable<Array<Language>>;

  languageLevels: Observable<Array<LanguageLevel>>;

  selectedLanguage: Language;
  selectedLevel: LanguageLevel;

  errors = {};

  constructor(private store: Store<State>, private service: ProfileService) { }

  ngOnInit() {

    this.languages = this.store.pipe(select(state => state.core.languages));
    this.languageLevels = this.store.pipe(select(state => state.core.languageLevels));

  }

  compareEntity(a: any, b: any)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

  async onSubmitHandler(form: NgForm)
  {
    const skill: LanguageSkill = new LanguageSkill();
    skill.language = this.selectedLanguage;
    skill.level = this.selectedLevel;

    try {
      const newSkill = await this.service.addSkill(skill).toPromise();
      this.createEvent.emit(newSkill);
    }
    catch ({ error }) {
      this.errors = error;
    }
  }
}
