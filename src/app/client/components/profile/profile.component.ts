import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Observable, Subscription} from 'rxjs';
import User from '../../../core/data/model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;

  authorizedUser: Observable<User>;

  paramsSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private route: ActivatedRoute,
      private router: Router,
      private service: ProfileService
      ) {

    this.authorizedUser = this.store.pipe(select(state => state.security.authorizedUser));


  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(async (params) => {

      try
      {
        this.user = await this.service.get(params['id']).toPromise();
      }
      catch (error)
      {
        this.router.navigateByUrl('/client/404');
      }

    });
  }

  ngOnDestroy(): void {

    this.paramsSubscription.unsubscribe();

  }

}
