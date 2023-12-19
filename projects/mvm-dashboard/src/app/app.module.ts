
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FyInputComponent, FySidebarComponent, FyContainerDashboardComponent, FyAuthComponent, FyModalComponent, FyCardProfileComponent, FyButtonComponent, FyErrorFormComponent, FyLabelFormComponent, FyCheckboxComponent, FyToastNotificationComponent, FyTableComponent } from 'fy-lib-comp';
import { FyLoginComponent } from 'projects/fy-lib-comp/src/fy-authentication/fy-login/fy-login.component';
import { FyRegisterComponent } from 'projects/fy-lib-comp/src/fy-authentication/fy-register/fy-register.component';
import { FyCardDateComponent } from 'projects/fy-lib-comp/src/fy-card-date/fy-card-date.component';
import { FyCardInfoGenericComponent } from 'projects/fy-lib-comp/src/fy-card-info-generic/fy-card-info-generic.component';
import { FyCardMovieComponent } from 'projects/fy-lib-comp/src/fy-card-movie/fy-card-movie.component';
import { FyCardComponent } from 'projects/fy-lib-comp/src/fy-card/fy-card.component';
import { FySpinnerBgComponent } from 'projects/fy-lib-comp/src/fy-spinner-bg/fy-spinner-bg.component';
import { FyTextareaComponent } from 'projects/fy-lib-comp/src/fy-textarea/fy-textarea.component';
import { FyTooltipsComponent } from 'projects/fy-lib-comp/src/fy-tooltips/fy-tooltips.component';
import { FyUploadFileComponent } from 'projects/fy-lib-comp/src/fy-upload-file/fy-upload-file.component';
import { InputfyComponent } from 'projects/fy-lib-comp/src/inputfy/inputfy.component';
import { FyAuthInterceptorInterceptor } from 'projects/fy-interceptors/src/public-api';
import { FyContainerDashboardCrmComponent } from 'projects/fy-lib-comp/src/fy-container-dashboard-crm/fy-container-dashboard-crm.component';
import { FyNavbarComponent } from 'projects/fy-lib-comp/src/fy-navbar/fy-navbar.component';
import { FyTableCrmComponent } from 'projects/fy-lib-comp/src/fy-table-crm/fy-table-crm.component';
import { TagModule } from 'primeng/tag';
import { FyButtonIconComponent } from 'projects/fy-lib-comp/src/fy-button-icon/fy-button-icon.component';
import { FySelectComponent } from 'projects/fy-lib-comp/src/fy-select/fy-select.component';

registerLocaleData(localeEs, 'es');
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: FyAuthInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserModule,
    FyTableCrmComponent,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FyInputComponent,
    FySidebarComponent,
    FyContainerDashboardComponent,
    FyContainerDashboardCrmComponent,
    FyNavbarComponent,
    FyRegisterComponent,
    FyAuthComponent,
    FyLoginComponent,
    FyModalComponent,
    FyCardProfileComponent,
    FyButtonComponent,
    FyErrorFormComponent,
    FyLabelFormComponent,
    FyCheckboxComponent,
    FyToastNotificationComponent,
    FyCardDateComponent,
    FyTooltipsComponent,
    FySpinnerBgComponent,
    FyCardInfoGenericComponent,
    FyTableComponent,
    FyCardComponent,
    FyCardMovieComponent,
    FyUploadFileComponent,
    FyTextareaComponent,
    InputfyComponent,
    TagModule,
    FyButtonIconComponent,
    FyTooltipsComponent,
    FySelectComponent



  ]
})
export class AppModule { }
