import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {NotifyMessage} from "../../data/model/notify-message.model";
import {filter} from "rxjs/operators";
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-message-notifier',
  templateUrl: './message-notifier.component.html',
  styleUrls: ['./message-notifier.component.css']
})
export class MessageNotifierComponent implements OnInit {

  constructor(
    private store: Store<State>,
    private toastr: ToastrService,
    private translator: TranslateService
  )
  {

  }

  ngOnInit() {

    this.store.pipe(select(state => state.core.lastSuccessMessage), filter(message => !!message)).subscribe(
      async (message: NotifyMessage) => {
        this.toastr.success(
            await this.translator.get(message.text).toPromise(),
            'Success!'
        );
      }
    );

    this.store.pipe(select(state => state.core.lastWarningMessage), filter(message => !!message)).subscribe(
        async (message: NotifyMessage) => {
          this.toastr.warning(
              await this.translator.get(message.text).toPromise(),
              'Warning!'
          );
        }
    );

    this.store.pipe(select(state => state.core.lastErrorMessage), filter(message => !!message)).subscribe(
      async (message: NotifyMessage) => {
        this.toastr.error(
            await this.translator.get(message.text).toPromise(),
            'Oops!'
        )
      }
    );
  }
}
