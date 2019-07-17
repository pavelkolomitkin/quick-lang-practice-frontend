import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import User from '../../../../core/data/model/user.model';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ProfileService} from '../../../services/profile.service';
import {UploadItem} from '../../../../core/data/model/upload-item.model';
import {Subscription} from 'rxjs';
import {UserUpdated} from '../../../../security/data/actions';
import {GlobalNotifyErrorMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';

@Component({
  selector: 'app-client-avatar-manager',
  templateUrl: './avatar-manager.component.html',
  styleUrls: ['./avatar-manager.component.css']
})
export class AvatarManagerComponent implements OnInit, OnDestroy {


  @Input() user: User;

  @ViewChild('fileInput') fileInput: ElementRef;

  uploadingSubscription: Subscription;

  constructor(private store: Store<State>, private service: ProfileService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {

    this.cleanUploadSubscription();

  }

  onUploadButtonClickHandler(event)
  {
    this.fileInput.nativeElement.click();
  }


  onFilesSelectHandler(files: File[])
  {
    if (files.length === 0)
    {
      return;
    }

    const avatar = new UploadItem('USER_AVATAR', files[0]);

    this.cleanUploadSubscription();
    this.uploadingSubscription = this.service.uploadAvatar(avatar).subscribe((data: UploadItem<any>) => {

      if (data.uploaded)
      {
        this.cleanUploadSubscription();

        const user: User = User.createFromRawData(data.uploaded);
        this.store.dispatch(new UserUpdated(user));
      }

    }, (error) => {
      this.cleanUploadSubscription();
    });

    this.fileInput.nativeElement.value = '';
  }

  async onRemoveAvatarClickHandler(event)
  {
    try {
      const profile: User = await this.service.removeAvatar().toPromise();
      this.store.dispatch(new UserUpdated(profile));
    }
    catch (error) {
      this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Can not remove avatar!')));
    }
  }

  cleanUploadSubscription()
  {
    if (this.uploadingSubscription)
    {
      this.uploadingSubscription.unsubscribe();
      this.uploadingSubscription = null;
    }
  }

}
