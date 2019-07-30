import {BaseService} from '../../core/services/base.service';
import {Injectable} from '@angular/core';
import {Language} from '../../core/data/model/language.model';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import User from '../../core/data/model/user.model';

@Injectable()
export class SearchPartnerService extends BaseService
{
  getList(language: Language, page: number = 1)
  {
    const params: HttpParams = this.getHttpParamsFromObject({
      language: language.id,
      page
    });

    return this.http.get<{ users: User[] }>('/client/search-partner/list', {params})
      .pipe(
        map(({users}) => users.map(user => User.createFromRawData(user)))
      );
  }
}
