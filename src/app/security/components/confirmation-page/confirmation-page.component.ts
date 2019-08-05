import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {UserLoginSuccess, UserRegistrationConfirmStart} from '../../data/actions';
import {Subscription} from "rxjs";
import User from "../../../core/data/model/user.model";
import {isArray} from "util";
import {SecurityService} from '../../services/security.service';
import {filter} from 'rxjs/operators';
import {GlobalNotifySuccessMessage} from '../../../core/data/actions';
import {NotifyMessage} from '../../../core/data/model/notify-message.model';


@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit, OnDestroy {

  routeSubscription: Subscription;
  authUserSubscription: Subscription;

  isUserActivated = false;
  activationErrors;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SecurityService,
    private store: Store<State>
  ) {


  }

  ngOnInit() {

    this.routeSubscription = this.route.params.subscribe(async (params) => {

      try {
        const token = await this.service.registerConfirm(params['key']).toPromise();
        this.isUserActivated = true;

        this.store.dispatch(new UserLoginSuccess(token));
      }
      catch ({ error: { errors } }) {
        this.activationErrors = errors['key'];
      }

    });

    this.authUserSubscription = this.store.pipe(
      select(state => state.security.authorizedUser),
      filter( result => !!result )
    ).subscribe((user: User) => {

      if (this.isUserActivated)
      {
        this.store.dispatch(new GlobalNotifySuccessMessage(new NotifyMessage('You have confirmed your account!')));
      }

      this.router.navigateByUrl('/');

    });
  }

  ngOnDestroy(): void {

    this.routeSubscription.unsubscribe();
    this.authUserSubscription.unsubscribe();
  }

}
