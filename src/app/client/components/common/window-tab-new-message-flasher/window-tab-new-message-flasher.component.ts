import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Subscription} from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-client-window-tab-new-message-flasher',
  templateUrl: './window-tab-new-message-flasher.component.html',
  styleUrls: ['./window-tab-new-message-flasher.component.css']
})
export class WindowTabNewMessageFlasherComponent implements OnInit, OnDestroy {

  static COMMON_PAGE_TITLE = 'Quick Language Practice';

  newMessageNumberSubscription: Subscription;
  windowFocusChangeSubscription: Subscription;

  newMessageNumber: number;
  isWindowFocused: boolean;

  pageTitleElement: any;
  isMessageNumberShown: boolean = false;

  flashTimerDescriptor = null;

  constructor(
    private store: Store<State>
  ) {

     this.pageTitleElement = $('head title');

  }

  ngOnInit() {

    this.newMessageNumberSubscription = this.store.pipe(select(state => state.clientProfile.newMessageNumber)).subscribe((value) => {

      this.clearFlashSignal();

      this.newMessageNumber = value;
      if (!this.isWindowFocused && (this.newMessageNumber > 0))
      {
        // launch flash message at the window tab
        this.initFlashSignal();
      }

    });

    this.windowFocusChangeSubscription = this.store.pipe(select(state => state.core.isWindowFocused)).subscribe((isFocused: boolean) => {

      this.isWindowFocused = isFocused;
      if (this.isWindowFocused)
      {
        this.clearFlashSignal();
      }

    });

  }

  ngOnDestroy(): void {

    this.newMessageNumberSubscription.unsubscribe();
    this.windowFocusChangeSubscription.unsubscribe();

  }

  initFlashSignal()
  {
    this.flashTimerDescriptor = setInterval(() => {

      let title: string = '';

      if (this.isMessageNumberShown)
      {
        title = WindowTabNewMessageFlasherComponent.COMMON_PAGE_TITLE;
      }
      else
      {
        title = this.getTitle();
      }

      this.pageTitleElement.text(title);

      this.isMessageNumberShown = !this.isMessageNumberShown;

    }, 1000);
  }

  clearFlashSignal()
  {
    if (this.flashTimerDescriptor !== null)
    {
      clearInterval(this.flashTimerDescriptor);
      this.flashTimerDescriptor = null;
    }

    this.pageTitleElement.text(WindowTabNewMessageFlasherComponent.COMMON_PAGE_TITLE);
  }

  getTitle()
  {
    return this.newMessageNumber + ' new message' + ((this.newMessageNumber > 1) ? 's' : '');
  }

}
