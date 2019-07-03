import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import RegisterData from "../../data/model/register-data.model";
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GlobalUserAgreementVisibility} from '../../../core/data/actions';
declare var $: any;

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() validationErrors:any = {
    plainPassword: {}
  };

  @Output('onSubmit') onSubmitEvent: EventEmitter<RegisterData> = new EventEmitter();

  constructor(private store: Store<State>) { }

  ngOnInit() {

  }

  onSubmit(form:NgForm)
  {
    const { email, fullName, password, passwordRepeat } = form.value;

    const data: RegisterData = {
      email: email,
      fullName: fullName,
      password: password,
      passwordRepeat: passwordRepeat
    };

    this.onSubmitEvent.emit(data);
  }

  onAgreementClickHandler(event)
  {
    this.store.dispatch(new GlobalUserAgreementVisibility(true));
  }
}
