import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import User from '../../../../core/data/model/user.model';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit, OnDestroy {

  user: User;

  authorizedUser: Observable<User>;

  paramsSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private route: ActivatedRoute,
      private router: Router,
      private service: ProfileService
  ) { }

  ngOnInit() {

    this.authorizedUser = this.store.pipe(select(state => state.security.authorizedUser));

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
