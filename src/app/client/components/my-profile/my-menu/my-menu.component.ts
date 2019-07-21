import {Component, Input, OnInit} from '@angular/core';
import User from '../../../../core/data/model/user.model';

@Component({
  selector: 'app-client-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.css']
})
export class MyMenuComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
