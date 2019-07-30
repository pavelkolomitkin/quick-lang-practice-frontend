import {BaseService} from '../../core/services/base.service';
import {map} from 'rxjs/operators';
import User from '../../core/data/model/user.model';
import {LanguageSkill} from '../../core/data/model/language-skill.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileUploadService} from '../../core/services/file-upload.service';
import {UploadItem} from '../../core/data/model/upload-item.model';
import {add} from 'ngx-bootstrap/chronos';

@Injectable()
export class ProfileService extends BaseService
{
    constructor(http: HttpClient, private uploader: FileUploadService)
    {
        super(http);
    }

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
            aboutYourSelf: user.aboutYourSelf,
            fullName: user.fullName
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

    uploadAvatar(avatar: UploadItem<any>)
    {
        return this
            .uploader
            .upload('/client/profile/avatar/upload', avatar.file, 'image')
            .pipe(
                map((data: any) => {
                    if (data.type === FileUploadService.UPLOAD_EVENT_TYPE_PROGRESS)
                    {
                        avatar.setProgress(data.loaded, data.total);
                    }
                    else if (data.type === FileUploadService.UPLOAD_EVENT_TYPE_COMPLETE)
                    {
                        avatar.uploaded = data.body;
                    }

                    return avatar;
                })
            );
    }

    removeAvatar()
    {
        return this.http.put<User>('/client/profile/avatar/remove', {});
    }

    blockProfile(addressee: User)
    {
        return this.http.post('/client/profile/' + addressee.id + '/block', {});
    }

    unBlockProfile(addressee: User)
    {
        return this.http.post('/client/profile/' + addressee.id + '/unblock', {});
    }

    amIBlockedBy(user: User)
    {
        return this.http.get<{ result: boolean }>('/client/profile/am-i-blocked-by/' + user.id).pipe(
            map(({ result }) => {
                return result;
            })
        );
    }

    isUserBlockedByMe(user: User)
    {
        return this.http.get<{ result: boolean }>('/client/profile/is-user-blocked/' + user.id).pipe(
            map(({ result }) => {
                return result;
            })
        );
    }
}
