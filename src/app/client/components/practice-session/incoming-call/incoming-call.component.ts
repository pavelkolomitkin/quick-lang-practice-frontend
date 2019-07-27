import {Component, Input, OnInit} from '@angular/core';
import {PracticeSession} from '../../../../core/data/model/practice-session.model';

@Component({
  selector: 'app-client-incoming-call',
  templateUrl: './incoming-call.component.html',
  styleUrls: ['./incoming-call.component.css']
})
export class IncomingCallComponent implements OnInit {

  @Input() session: PracticeSession;

  constructor() { }

  ngOnInit() {
  }

}
