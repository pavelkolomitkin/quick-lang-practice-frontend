import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {UserRegistrationConfirmStart} from "../../data/actions";
import {Subscription} from "rxjs";
import User from "../../../core/data/model/user.model";
import {isArray} from "util";
import {SecurityService} from '../../services/security.service';


@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit, OnDestroy {

  routeSubscription: Subscription;

  isUserActivated = false;
  activationErrors;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SecurityService
  ) {


  }

  ngOnInit() {

    this.routeSubscription = this.route.params.subscribe(async (params) => {

      try {
        await this.service.registerConfirm(params['key']).toPromise();
        this.isUserActivated = true;
      }
      catch ({ error }) {
        this.activationErrors = error['key'];
      }

    });
  }

  ngOnDestroy(): void {

    this.routeSubscription.unsubscribe();
  }

}
