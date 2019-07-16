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

    update(user: User)
    {
        const body = {
            aboutYourSelf: user.aboutYourSelf
        };

        return this.http.put('/client/profile', body);
    }

    setPracticeSkillStatus(skill: LanguageSkill = null)
    {
        if (!skill)
        {
            return this.http.put<{ skill: LanguageSkill }>('/client/profile/practice-skill/off', {}).pipe(
                map(({ skill }) => {
                    return skill;
                })
            );
        }
        else
        {
            return this.http.put<{ skill: LanguageSkill }>('/client/profile/practice-skill/' + skill.id, {}).pipe(
                map(({ skill }) => {
                    return skill;
                })
            );
        }
    }
}
