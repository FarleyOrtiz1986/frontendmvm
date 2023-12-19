import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SpinnerBgService } from 'projects/fy-lib-comp/src/services/spinner-bg.service';
import { ToastNotificationService } from 'projects/fy-lib-comp/src/services/toast-notification.service';
import { FyAccessConstantsService } from 'projects/fy-services/src/acces-conts/fy-access-constants.service';
import { FyAuthService } from 'projects/fy-services/src/http/fy-auth.service';
import { FyCrudService } from 'projects/fy-services/src/http/fy-crud.service';
import { FyErrorManagerService } from 'projects/fy-services/src/http/fy-error-manager.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {

  crudSvc = inject(FyCrudService);
  authSvc = inject(FyAuthService)
  errorSvc = inject(FyErrorManagerService);
  accesConstSvc= inject(FyAccessConstantsService);
  toastNotSvc = inject(ToastNotificationService);
  spinnerSvc = inject(SpinnerBgService);
 

  padre_id: number = 1;
  padre: any | undefined;
  formRegister!: FormGroup; // Gestion del formulario 
  submitedForm = false;  // Gestion del formulario 
  isEmail = this.accesConstSvc.regularExpressEmail;
  visibleModalProfile = false;


  constructor(private fbForm: FormBuilder, private actRoute: ActivatedRoute, private router: Router) {
    this.spinnerSvc.showSpinnerBg("Cargando...");
    this.crudSvc.urlBase = environment.urlApi;
    this.authSvc.urlBase = environment.urlApi;
    const idParam = this.actRoute.snapshot.paramMap.get('id');
    if (idParam !== null && !isNaN(Number(idParam))) {
      this.padre_id = Number(idParam);
    }
    
    this.crudSvc.getItem("usuarios/", this.padre_id).subscribe({
      next: data => {
        this.spinnerSvc.closeSpinnerBg();
        this.padre = data.data;
        this.padre.url_avatar = environment.urlImgLocal + this.padre.url_avatar;
      },
      error: err => {
        console.log(err);
        this.spinnerSvc.closeSpinnerBg();
        this.toastNotSvc.activateToastNotification("danger", "No es posible registrarse con este link, comuniquese con el administrador de la plataforma");
      }
      
    });
    this.initForm();
  }

  ngOnInit(): void { }

  initForm() {
    this.formRegister = this.fbForm.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(400), Validators.pattern(this.isEmail)])],
      phone: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      whatsapp: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      policies: [false, Validators.compose([Validators.requiredTrue])],
    });
  }

  get name() { return this.formRegister.get('name'); }
  get lastName() { return this.formRegister.get('lastName'); }
  get email() { return this.formRegister.get('email'); }
  get phone() { return this.formRegister.get('phone'); }
  get whatsapp() { return this.formRegister.get('whatsapp'); }
  get password() { return this.formRegister.get('password'); }
  get repeatPassword() { return this.formRegister.get('repeatPassword'); }
  get policies() { return this.formRegister.get('policies'); }


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
      padre_id: this.padre_id,
      url_avatar:"user.jpg",
      nombres: this.name?.value,
      apellidos: this.lastName?.value,
      telefono_celular: this.phone?.value,
      telefono_whatsapp: this.whatsapp?.value
    }
    this.authSvc.register("register-customer-with-hass", data).subscribe({
      next: response => {
        this.authSvc.setTokenStorage(response.data.token)
        this.authSvc.setUserAuthStorage(response.data.user);
        this.authSvc.setUsusarioAuthStorage(response.data.usuario);
        this.router.navigate(['/home']);
      },
      error: err => {
         this.toastNotSvc.activateToastNotification("danger",err.error.message + " - " + err.error.errors);
      }
    });
  }

}


