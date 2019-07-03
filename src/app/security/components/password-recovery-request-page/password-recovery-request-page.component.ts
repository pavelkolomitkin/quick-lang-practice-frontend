import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {SecurityService} from '../../services/security.service';

@Component({
  selector: 'app-password-recovery-request-page',
  templateUrl: './password-recovery-request-page.component.html',
  styleUrls: ['./password-recovery-request-page.component.css']
})
export class PasswordRecoveryRequestPageComponent implements OnInit {

  errors: any = {};

  requestSuccess: boolean = false;
  isRequesting: boolean = false;

  constructor(
      private service: SecurityService
  ) { }

  ngOnInit() {
  }


  async onSubmit(form: NgForm)
  {
    this.isRequesting = true;

    const { email } = form.value;

    try {
      await this.service.passwordRecoverRequest(email).toPromise();

      this.requestSuccess = true;
    }
    catch (errors) {
      this.errors = errors.error;
    }

    this.isRequesting = false;
  }
}
