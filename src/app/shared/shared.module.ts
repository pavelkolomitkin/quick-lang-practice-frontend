import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultiLinePipe} from './pipes/multi-line.pipe';
import {NounFormPipe} from './pipes/noun-form.pipe';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MomentModule} from 'ngx-moment';
import {FormFieldErrorListComponent} from '../core/components/form-field-error-list/form-field-error-list.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {DateTimeViewComponent} from './components/date-time-view/date-time-view.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {RouterModule} from '@angular/router';
import {NgxPermissionsModule} from 'ngx-permissions';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslationLoaderService} from './services/translation-loader.service';
import {environment} from '../../environments/environment';
import {ModalModule} from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    MultiLinePipe,
    NounFormPipe,
    FormFieldErrorListComponent,
    NotFoundPageComponent,
    PaginatorComponent,
    DateTimeViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InfiniteScrollModule,
    MomentModule,
    ModalModule,
      TooltipModule.forRoot(),
    NgxPermissionsModule.forChild(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslationLoaderService
      },
      useDefaultLang: true
    })
  ],
    exports: [
        FormsModule,
        InfiniteScrollModule,
        MomentModule,
        ModalModule,
        TooltipModule,
        TranslateModule,
        FormFieldErrorListComponent,
        NotFoundPageComponent,
        PaginatorComponent,
        DateTimeViewComponent,
        MultiLinePipe,
    ]
})
export class SharedModule {

  constructor(private translate: TranslateService)
  {
    this.translate.setDefaultLang(environment.lang);
  }
}
