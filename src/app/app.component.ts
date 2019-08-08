import {Component, HostListener} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './app.state';
import {GlobalWindowFocusChanged} from './core/data/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private store: Store<State>
  ) {}

  @HostListener('window:focus', ['$event'])
  onWindowFocusHandler(event: FocusEvent)
  {
    this.store.dispatch(new GlobalWindowFocusChanged(true));
  }

  @HostListener('window:blur', ['$event'])
  onWindowBlurHandler(event: FocusEvent)
  {
    this.store.dispatch(new GlobalWindowFocusChanged(false));
  }
}
