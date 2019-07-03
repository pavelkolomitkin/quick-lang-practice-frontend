import {BaseService} from '../../core/services/base.service';
import {map} from 'rxjs/operators';
import User from '../../core/data/model/user.model';

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
}
