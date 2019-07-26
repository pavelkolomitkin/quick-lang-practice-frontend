import {BaseSocketService} from '../../core/services/base-socket.service';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import User from '../../core/data/model/user.model';

@Injectable()
export class UsersSocketService extends BaseSocketService
{
    getNamespace(): string {
        return 'users';
    }

    getBlockedByUser()
    {
        return this
            .fromEvent('user_block_addressee')
            .pipe(
                map((user) => <User>user)
            );
    }

    getUnBlockedByUser()
    {
        return this
            .fromEvent('user_unblock_addressee')
            .pipe(
                map((user) => <User>user)
            );
    }
}
