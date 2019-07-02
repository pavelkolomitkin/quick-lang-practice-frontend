import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnDestroy {

  page: number = 0;

  _totalItems: number = 0;

  queryStringParams: {};

  numberOfPages: number = 0;

  queryParamsSubscription: Subscription;

  @Input() itemsOnPage: number = 10;

  @Input()
  set totalItems(value)
  {
    this._totalItems = value;

    this.numberOfPages = Math.floor(this._totalItems / this.itemsOnPage);
    if (this._totalItems > this.itemsOnPage)
    {
      this.numberOfPages++;
    }
  }


  constructor(
      private route: ActivatedRoute,
      private location: Location
  ) { }

  ngOnInit() {

    this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {

      this.queryStringParams = params;

      this.page = (!!params.page && params.page > 0) ? params.page : 1;

    });

  }

  ngOnDestroy(): void {

    this.queryParamsSubscription.unsubscribe();

  }

  getQueryParameters(page: number)
  {
    return {...this.queryStringParams, page: page};
  }

}
