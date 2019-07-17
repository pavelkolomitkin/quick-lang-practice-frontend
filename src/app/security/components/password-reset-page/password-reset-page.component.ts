import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SecurityService} from '../../services/security.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.css']
})
export class PasswordResetPageComponent implements OnInit, OnDestroy {


  static CHECKING_KEY_STATE = 'checking_key';
  static INVALID_KEY_STATE = 'invalid_key';
  static INPUT_STATE = 'input';
  static SUCCESS_STATE = 'success';

  errors: any = {};

  currentState = PasswordResetPageComponent.CHECKING_KEY_STATE;
  isRequesting: boolean = false;

  paramsSubscription: Subscription;

  constructor(
      private route: ActivatedRoute,
      private service: SecurityService
  ) { }

  ngOnInit() {

    this.paramsSubscription = this.route.params.subscribe(async (params) => {

      this.currentState = PasswordResetPageComponent.CHECKING_KEY_STATE;

      try
      {
        await this.service.verifyRecoveryKey(params['key']).toPromise();

        this.currentState = PasswordResetPageComponent.INPUT_STATE;
      }
      catch (errors) {

        this.currentState = PasswordResetPageComponent.INVALID_KEY_STATE;
      }

    });

  }

  ngOnDestroy(): void {

    this.paramsSubscription.unsubscribe();

  }

  async onSubmitHandler(form: NgForm)
  {
    this.isRequesting = true;

    const key = this.route.snapshot.params['key'];
    const { password, passwordRepeat } = form.value;

    try {

      await this.service.resetPassword(key, {
        password: password,
        passwordRepeat: passwordRepeat
      }).toPromise();

      this.currentState = PasswordResetPageComponent.SUCCESS_STATE;
    }
    catch ({ error: { errors } }) {
      this.errors = errors;
    }

    this.isRequesting = false;
  }

}
