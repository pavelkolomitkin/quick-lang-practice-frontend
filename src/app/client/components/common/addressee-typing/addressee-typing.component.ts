import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import User from '../../../../core/data/model/user.model';

@Component({
  selector: 'app-client-addressee-typing',
  templateUrl: './addressee-typing.component.html',
  styleUrls: ['./addressee-typing.component.css'],
})
export class AddresseeTypingComponent implements OnInit, OnDestroy {

  isVisible: boolean = false;

  visibilityTimeoutId: any = null;

  @Input() addressee: User;

  @Input() displayDelay: number;

  @Input() customMessage: string = '';

  @Input() customClass: string;

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this.visibilityTimeoutId)
    {
      clearTimeout(this.visibilityTimeoutId);
      this.visibilityTimeoutId = null;
    }
  }

  setVisible()
  {
    if (this.visibilityTimeoutId !== null)
    {
      clearInterval(this.visibilityTimeoutId);
      this.visibilityTimeoutId = null;
    }

    this.isVisible = true;

    this.visibilityTimeoutId = setTimeout(() => {
      //debugger

      this.isVisible = false;

    }, this.displayDelay);
  }

}
