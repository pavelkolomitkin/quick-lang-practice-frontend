import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {NgxPermissionsModule} from 'ngx-permissions';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {GlobalProgressComponent} from './components/global-progress/global-progress.component';
import {CommonLayoutComponent} from './components/common-layout/common-layout.component';
import {ContentComponent} from './components/content/content.component';
import {ContentHeaderComponent} from './components/content-header/content-header.component';
import {HeaderComponent} from './components/header/header.component';
import {MainFooterComponent} from './components/main-footer/main-footer.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {ConfirmationWindowComponent} from './components/confirmation-window/confirmation-window.component';
import {ControlItemComponent} from './components/confirmation-window/control-item/control-item.component';
import {MessageNotifierComponent} from './components/message-notifier/message-notifier.component';
import { reducer as coreReducer } from './data/reducer';
import { reducer as securityReducer } from '../security/data/reducer';
import {AuthEffects} from '../security/data/effects/auth.effects';
import {AuthUserGuardService} from '../security/services/guards/auth-user-guard.service';
import {DefaultRedirectGuard} from '../security/services/guards/default-redirect-guard.service';
import {BaseApiUrlInterceptor} from './services/interceptors/base-api-url.interceptor';
import {DefaultHttpHeadersInterceptor} from './services/interceptors/default-http-headers.interceptor';
import {AuthTokenInjectorInterceptor} from './services/interceptors/auth-token-injector.interceptor';
import {ErrorResponseHandlerInterceptor} from './services/interceptors/error-response-handler.interceptor';
import {SecurityService} from '../security/services/security.service';
import {LocalStorageService} from './services/local-storage.service';
import {FileUploadService} from './services/file-upload.service';
import {ConfirmLeavePageGuardService} from './services/guards/confirm-leave-page-guard.service';
import {UserAgreementService} from './services/user-agreement-service';
import {appInitializeHandler, AppInitializerService} from './services/app-initializer.service';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import {LanguageService} from './services/language.service';
import {LanguageLevelService} from './services/language-level.service';
import {ConfirmActionService} from './services/confirm-action.service';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseHandlerInterceptor, multi: true },
];

@NgModule({
  declarations: [
    GlobalProgressComponent,
    CommonLayoutComponent,
    ContentComponent,
    ContentHeaderComponent,
    HeaderComponent,
    MainFooterComponent,
    MainMenuComponent,
    ConfirmationWindowComponent,
    ControlItemComponent,
    ConfirmationWindowComponent,
    MessageNotifierComponent,
    ConfirmationComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgxPermissionsModule.forRoot(),
    SharedModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.forRoot({
      core: coreReducer,
      security: securityReducer,
    }),
    EffectsModule.forRoot([
        AuthEffects
    ])
  ],

  providers: [
    AuthUserGuardService,
    DefaultRedirectGuard,
    httpInterceptorProviders,
    SecurityService,
    LocalStorageService,
    FileUploadService,
    ConfirmLeavePageGuardService,
    UserAgreementService,
    LanguageService,
    LanguageLevelService,
    ConfirmActionService,
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializeHandler,
      deps: [AppInitializerService],
      multi: true
    }
  ],

  exports: [
    NgxPermissionsModule,
    SharedModule,
    StoreModule,
    ToastrModule,
    ModalModule,
    EffectsModule,
    GlobalProgressComponent,
    CommonLayoutComponent,
    ContentComponent,
    ContentHeaderComponent,
    HeaderComponent,
    MainFooterComponent,
    MainMenuComponent,
    ConfirmationComponent,
    MessageNotifierComponent
  ]
})
export class CoreModule { }
