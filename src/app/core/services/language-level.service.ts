import {BaseService} from './base.service';
import {LanguageLevel} from '../data/model/language-level.model';
import {map} from 'rxjs/operators';

export class LanguageLevelService extends BaseService
{
    getList()
    {
        return this.http.get<{ levels: Array<LanguageLevel> }>('/common/language-level/list').pipe(
            map(({ levels }) => {
                return levels
            })
        );
    }
}
