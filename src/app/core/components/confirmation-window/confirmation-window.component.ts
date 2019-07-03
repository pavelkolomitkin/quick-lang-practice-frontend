import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ActionConfirmation} from '../../data/model/action-confirmation.model';
import {ConfirmationActionOption} from '../../data/model/confirmation-action-option.model';

@Component({
  selector: 'app-confirmation-window',
  templateUrl: './confirmation-window.component.html',
  styleUrls: ['./confirmation-window.component.css']
})
export class ConfirmationWindowComponent implements OnInit, AfterViewInit {

  @Output('onConfirm') confirm: EventEmitter<ActionConfirmation> = new EventEmitter();

  @Input() confirmation: ActionConfirmation;

  constructor() { }

  ngOnInit() {


  }

  ngAfterViewInit(): void {


  }

  onActControlHandler(option: ConfirmationActionOption)
  {
    this.confirmation.userResponse = option;

    this.confirm.emit(this.confirmation);

  }
}
