import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { initFirebaseBackend } from './authUtils';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule, NgbTooltipModule, NgbPopoverModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesModule } from './pages/pages.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ExtrapagesModule } from './extrapages/extrapages.module';

import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { AccountModule } from './account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from './pages/chart/chart.module';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePipe } from '@angular/common';
import {ToastrModule} from 'ngx-toastr'



if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  FakeBackendInterceptor;
}
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    LayoutsModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbNavModule,
    ExtrapagesModule,
    AccountModule,
    HighchartsChartModule,
    ChartModule,
    ToastrModule.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }, // add as factory to your providers
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
