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
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-confirmation-window',
  templateUrl: './confirmation-window.component.html',
  styleUrls: ['./confirmation-window.component.css']
})
export class ConfirmationWindowComponent implements OnInit, AfterViewInit {

  @Output('onConfirm') confirm: EventEmitter<ActionConfirmation> = new EventEmitter();

  @Input() confirmation: ActionConfirmation;

  @ViewChild('modalWindow')
  templateWindow: TemplateRef<any>;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {



  }

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.modalRef = this.modalService.show(this.templateWindow);

    }, 1);

  }

  onActControlHandler(option: ConfirmationActionOption)
  {
    this.confirmation.userResponse = option;

    this.modalRef.hide();

    this.confirm.emit(this.confirmation);
  }
}
