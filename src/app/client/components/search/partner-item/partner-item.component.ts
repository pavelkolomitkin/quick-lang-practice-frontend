import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import User from '../../../../core/data/model/user.model';
import {Language} from '../../../../core/data/model/language.model';
import {LanguageSkill} from '../../../../core/data/model/language-skill.model';

@Component({
  selector: 'app-client-partner-item',
  templateUrl: './partner-item.component.html',
  styleUrls: ['./partner-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerItemComponent implements OnInit {

  @Input() user: User;

  @Input() relevantLanguage: Language;
  relevantLanguageSkill: LanguageSkill;

  additionDisplayedSkills: LanguageSkill[] = [];
  additionNotDisplayedSkillNumber = 0;

  levelStyleMap = {
    'beginner': 'secondary',
    'elementary': 'primary',
    'intermediate': 'success',
    'advanced': 'warning',
    'native': 'danger'
  };

  constructor() { }

  ngOnInit() {

    this.relevantLanguageSkill = this.user.skills.find((skill) => skill.language.id === this.relevantLanguage.id);

    const skills = this.user.skills.sort((skill1, skill2) => {
      if (skill1.level.level > skill2.level.level)
      {
        return -1;
      }
      if (skill1.level.level < skill2.level.level)
      {
        return 1;
      }

      return 0;
    });

    this.additionDisplayedSkills = skills
      .filter(item => item.id !== this.relevantLanguageSkill.id)
      .slice(0, 2)
    ;

    if (skills.length > 3)
    {
      this.additionNotDisplayedSkillNumber = skills.length - 3;
    }
  }

  getStyleBySkillLevel(language: Language)
  {
    const skill = this.user.skills.find(skill => skill.language.id === language.id);
    if (!skill)
    {
      return '';
    }

    return this.levelStyleMap[skill.level.code];
  }

}
