import {BaseService} from '../../core/services/base.service';
import {map} from 'rxjs/operators';
import User from '../../core/data/model/user.model';
import {LanguageSkill} from '../../core/data/model/language-skill.model';

export class ProfileService extends BaseService
{
    get(id)
    {
        return this.http.get('/client/profile/' + id).pipe(
            map((user) => {
                return User.createFromRawData(user);
            })
        )
    }

    updateAbout(text: string)
    {
        return this.http.put('/client/about-yourself', {
            text: text
        });
    }

    addSkill(skill: LanguageSkill)
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

    updateSkill(skill: LanguageSkill)
    {
        return this.http.put<{ skill: LanguageSkill }>('/client/skill/' + skill.id, {
            level: skill.level.id
        }).pipe(
            map(({ skill }) => {
                return skill;
            })
        );
    }

    removeSkill(skill: LanguageSkill)
    {
        return this.http.delete('/client/skill/' + skill.id);
    }

    setPracticeSkillStatus(skill: LanguageSkill = null)
    {
        if (!skill)
        {
            return this.http.put<{ skill: LanguageSkill }>('/client/practice-skill/off', {}).pipe(
                map(({ skill }) => {
                    return skill;
                })
            );
        }
        else
        {
            return this.http.put<{ skill: LanguageSkill }>('/client/practice-skill/on/' + skill.id, {}).pipe(
                map(({ skill }) => {
                    return skill;
                })
            );
        }
    }
}
