import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {Language} from '../data/model/language.model';

export class LanguageService extends BaseService
{
    getList()
    {
        return this.http.get<{ languages: Array<Language> }>('/common/language/list').pipe(
            map(({ languages }) => {
                return languages
            })
        );
    }
}
