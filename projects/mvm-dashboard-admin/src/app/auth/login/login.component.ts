import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerBgService } from 'projects/fy-lib-comp/src/services/spinner-bg.service';
import { ToastNotificationService } from 'projects/fy-lib-comp/src/services/toast-notification.service';
import { FyAccessConstantsService } from 'projects/fy-services/src/acces-conts/fy-access-constants.service';
import { FyAuthService } from 'projects/fy-services/src/http/fy-auth.service';
import { FyErrorManagerService } from 'projects/fy-services/src/http/fy-error-manager.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authSvc = inject(FyAuthService)
  errorSvc = inject(FyErrorManagerService);

  accesConstSvc= inject(FyAccessConstantsService);
  toastNotSvc = inject(ToastNotificationService);
  spinnerSvc=inject(SpinnerBgService);

  formLogin!: FormGroup; // Gestion del formulario 
  submitedFormLogin = false;  // Gestion del formulario 

  formRecoverPassword!: FormGroup; // Gestion del formulario 
  submitedFormRecoverPassword = false;  // Gestion del formulario 

  isEmail = this.accesConstSvc.regularExpressEmail;

  visibleModalRecoverPassword = false;
  
  constructor(private fbFormLogin: FormBuilder, private fbFormRecoverPassword: FormBuilder, private router: Router) {
    this.authSvc.urlBase = environment.urlApi;
    this.initForm();
   
  }

  ngOnInit(): void { }

  initForm() {
    this.formLogin = this.fbFormLogin.group({
      key: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(400), Validators.pattern(this.isEmail)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
    });

    this.formRecoverPassword = this.fbFormRecoverPassword.group({
      email_recover_password: ['', Validators.compose([Validators.required, Validators.maxLength(400), Validators.pattern(this.isEmail)])]
    });
  }

  get key() { return this.formLogin.get('key'); }
  get email() { return this.formLogin.get('email'); }
  get password() { return this.formLogin.get('password'); }

  get email_recover_password() { return this.formRecoverPassword.get('email_recover_password'); }

  actionFormLogin() {
    if (this.formLogin.invalid) {
      this.submitedFormLogin = true;
      return;
    }
    var data = {
      key: this.key?.value,
      email: this.email?.value,
      password: this.password?.value
    }
    this.spinnerSvc.showSpinnerBg("Estamos validando tus credenciales de acceso");
    this.authSvc.login("login-admin-with-hass", data).subscribe({
      next: response => {
        if(response.data && response.data.user){
          if(response.data.user.name  != 'Administrador' ){
            this.toastNotSvc.activateToastNotification("danger","Acceso solo para administradores.");
          }
        }
        if(response.data.user.name )
        this.authSvc.setTokenStorage(response.data.token)
        this.authSvc.setUserAuthStorage(response.data.user);
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err);
        this.errorSvc.error(err);
      }
    });

  }


  actionFormRecoverPassword() {
    if (this.formRecoverPassword.invalid) {
      console.log("invalid");
      this.submitedFormRecoverPassword = true;
      return;
    }
    var data = {
      email: this.email_recover_password?.value,
    }
    this.spinnerSvc.showSpinnerBg("Estamos validando la existencia del correo electrónico");
    this.authSvc.forgotPassword("forgot-password", data).subscribe({
      next: response => {
        console.log(response);
        this.spinnerSvc.closeSpinnerBg();
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.visibleModalRecoverPassword = !this.visibleModalRecoverPassword;
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }

}
