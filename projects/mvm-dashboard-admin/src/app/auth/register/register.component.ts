import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { SpinnerBgService } from 'projects/fy-lib-comp/src/services/spinner-bg.service';
import { ToastNotificationService } from 'projects/fy-lib-comp/src/services/toast-notification.service';
import { environment } from '../../environments/environment';
import { FyAuthService } from 'projects/fy-services/src/http/fy-auth.service';
import { FyAccessConstantsService } from 'projects/fy-services/src/acces-conts/fy-access-constants.service';
import { FyErrorManagerService } from 'projects/fy-services/src/http/fy-error-manager.service';
import { FyCrudService } from 'projects/fy-services/src/http/fy-crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  crudSvc = inject(FyCrudService);
  authSvc = inject(FyAuthService)
  errorSvc = inject(FyErrorManagerService);
  accesConstSvc = inject(FyAccessConstantsService);
  toastNotSvc = inject(ToastNotificationService);
  spinnerSvc = inject(SpinnerBgService);

  formRegister!: FormGroup; // Gestion del formulario 
  submitedForm = false;  // Gestion del formulario 
  isEmail = this.accesConstSvc.regularExpressEmail;

  constructor(private fbForm: FormBuilder, private router: Router) {
    this.authSvc.urlBase = environment.urlApi;
    this.initForm();
  }

  ngOnInit(): void { }

  initForm() {
    this.formRegister = this.fbForm.group({
      key: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(400), Validators.pattern(this.isEmail)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
    });
  }

  get key() { return this.formRegister.get('key'); }
  get email() { return this.formRegister.get('email'); }
  get password() { return this.formRegister.get('password'); }
  get repeatPassword() { return this.formRegister.get('repeatPassword'); }

  actionForm() {
    if (this.formRegister.invalid) {
      this.submitedForm = true;
      return;
    }
    var password = this.password?.value;
    var repeat_password = this.repeatPassword?.value;
    if (password != repeat_password) {
      this.toastNotSvc.activateToastNotification("danger", "Las contraseñas no coinciden");
      return;
    }

    var data = {
      email: this.email?.value,
      password: password,
      key: this.key?.value
    }
    this.authSvc.register("register-admin-with-hass", data).subscribe({
      next: response => {
console.log(response)
        if(response.data && response.data.user){
          if(response.data.user.name  != 'Administrador' ){
            this.toastNotSvc.activateToastNotification("danger","Acceso solo para administradores.");
            return;
          }
        } 
        this.authSvc.setTokenStorage(response.data.token)
        this.authSvc.setUserAuthStorage(response.data.user);
        this.router.navigate(['/home']);
      },
      error: err => {
        this.toastNotSvc.activateToastNotification("danger", err.error.message + " - " + err.error.errors);
      }
    });
  }

}


