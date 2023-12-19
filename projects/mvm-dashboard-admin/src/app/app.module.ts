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

import { FyLoginComponent } from '../../../fy-lib-comp/src/fy-authentication/fy-login/fy-login.component';
import { FyRegisterComponent } from '../../../fy-lib-comp/src/fy-authentication/fy-register/fy-register.component';
import { FyCardDateComponent } from '../../../fy-lib-comp/src/fy-card-date/fy-card-date.component';
import { FyCardInfoGenericComponent } from '../../../fy-lib-comp/src/fy-card-info-generic/fy-card-info-generic.component';
import { FyCardMovieComponent } from '../../../fy-lib-comp/src/fy-card-movie/fy-card-movie.component';
import { FyCardComponent } from '../../../fy-lib-comp/src/fy-card/fy-card.component';
import { FySpinnerBgComponent } from '../../../fy-lib-comp/src/fy-spinner-bg/fy-spinner-bg.component';
import { FyTextareaComponent } from '../../../fy-lib-comp/src/fy-textarea/fy-textarea.component';
import { FyTooltipsComponent } from '../../../fy-lib-comp/src/fy-tooltips/fy-tooltips.component';
import { FyUploadFileComponent } from '../../../fy-lib-comp/src/fy-upload-file/fy-upload-file.component';
import { FyInputComponent } from '../../../fy-lib-comp/src/fy-input/fy-input.component';
import { FySidebarComponent } from '../../../fy-lib-comp/src/fy-sidebar/fy-sidebar.component';
import { FyNavbarComponent } from '../../../fy-lib-comp/src/fy-navbar/fy-navbar.component';
import { FyAuthComponent } from '../../../fy-lib-comp/src/fy-authentication/fy-auth/fy-auth.component';
import { FyContainerDashboardComponent } from '../../../fy-lib-comp/src/fy-container-dashboard/fy-container-dashboard.component';
import { FyCardProfileComponent } from '../../../fy-lib-comp/src/fy-card-profile/fy-card-profile.component';
import { FyModalComponent } from '../../../fy-lib-comp/src/fy-modal/fy-modal.component';
import { FyButtonComponent } from '../../../fy-lib-comp/src/fy-button/fy-button.component';
import { FyErrorFormComponent } from '../../../fy-lib-comp/src/fy-error-form/fy-error-form.component';
import { FyCheckboxComponent } from '../../../fy-lib-comp/src/fy-checkbox/fy-checkbox.component';
import { FyLabelFormComponent } from '../../../fy-lib-comp/src/fy-label-form/fy-label-form.component';
import { FyToastNotificationComponent } from '../../../fy-lib-comp/src/fy-toast-notification/fy-toast-notification.component';
import { FyTableComponent } from '../../../fy-lib-comp/src/fy-table/fy-table.component';
import { FyCardFormComponent } from "../../../fy-lib-comp/src/fy-card-form/fy-card-form.component";
import { FyAuthInterceptorInterceptor } from 'projects/fy-interceptors/src/public-api';
import { FySelectComponent } from '../../../fy-lib-comp/src/fy-select/fy-select.component';
import { MenuFloatComponent } from './dashboard/shared-dash/menu-float/menu-float.component';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';




registerLocaleData(localeEs, 'es');
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuFloatComponent,
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
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        
        FyInputComponent,
        FySidebarComponent,
        FyContainerDashboardComponent,
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
        FyCardFormComponent,
        FySelectComponent,
        DropdownModule,
        TagModule,
        MultiSelectModule
      
    ]
})
export class AppModule { }
