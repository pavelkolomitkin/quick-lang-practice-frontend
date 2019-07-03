import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmationActionOption} from '../../../data/model/confirmation-action-option.model';

@Component({
  selector: 'app-control-item',
  templateUrl: './control-item.component.html',
  styleUrls: ['./control-item.component.css']
})
export class ControlItemComponent implements OnInit {

  @Output('onAction') actionEmit: EventEmitter<ConfirmationActionOption> = new EventEmitter();

  @Input() action: ConfirmationActionOption;

  constructor() { }

  ngOnInit() {
  }

  onClickHandler(event)
  {
    this.actionEmit.emit(this.action);
  }

}
