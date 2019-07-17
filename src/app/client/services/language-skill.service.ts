import {BaseService} from '../../core/services/base.service';
import {LanguageSkill} from '../../core/data/model/language-skill.model';
import {map} from 'rxjs/operators';

export class LanguageSkillService extends BaseService
{
    add(skill: LanguageSkill)
    {
        return this.http.post<{ skill: LanguageSkill }>('/client/skill', {
            language: skill.language.id,
            level: skill.level.id
        }).pipe(
            map(({ skill }) => {
                return skill;
            })
        );
    }

    update(skill: LanguageSkill)
    {
        return this.http.put<{ skill: LanguageSkill }>('/client/skill/' + skill.id, {
            level: skill.level.id
        }).pipe(
            map(({ skill }) => {
                return skill;
            })
        );
    }

    remove(skill: LanguageSkill)
    {
        return this.http.delete('/client/skill/' + skill.id);
    }
}
