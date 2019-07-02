import {Component, OnDestroy, OnInit} from '@angular/core';
import RegisterData from "../../data/model/register-data.model";
import {SecurityService} from '../../services/security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  errors: {} = {};

  constructor(private service: SecurityService, private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {  }


  async onFormSubmit(data:RegisterData)
  {

    try {
      await this.service.registerUser(data).toPromise();

      this.router.navigateByUrl('/security/register-success');
    }
    catch (errors) {
      this.errors = errors.error;
    }

  }

}
