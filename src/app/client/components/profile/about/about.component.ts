import {Component, Input, OnInit} from '@angular/core';
import User from '../../../../core/data/model/user.model';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-client-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() user: User;

  @Input() isEditable: boolean;

  isEditing: boolean = false;
  userAbout: string;

  constructor(private service: ProfileService) { }

  ngOnInit() {

    this.userAbout = this.user.aboutYourSelf;

  }

  onEndEditing(event)
  {
    this.isEditing = false;

    this.service.updateAbout(this.userAbout)
        .toPromise()
        .then(() => {
          this.user.aboutYourSelf = this.userAbout;
        })
        .catch((error) => {
          console.log(error);
        });

  }

  onEditClickHandler(event)
  {
    this.isEditing = true;
  }

}
