import { Injectable, inject } from '@angular/core';
import { ToastNotificationService } from 'projects/fy-lib-comp/src/services/toast-notification.service';
import { FyAccessConstantsService } from '../acces-conts/fy-access-constants.service';
import { Router } from '@angular/router';
import { SpinnerBgService } from 'projects/fy-lib-comp/src/services/spinner-bg.service';
import { FyAuthService } from './fy-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FyErrorManagerService {

  accesConst = inject(FyAccessConstantsService)
  toastNotSvc = inject(ToastNotificationService);
  spinnerSvc = inject(SpinnerBgService);

  ss= inject(FyAuthService);
  constructor( private router: Router,) { }

  error(err: any) {
    console.log(err);
    this.spinnerSvc.closeSpinnerBg()
    if (err.status != undefined) {
      if (err.status === 0){ 
        this.toastNotSvc.activateToastNotification("danger", this.accesConst.messageErrorHttpGeneral);
      } else if (err.status === 401){ 
        this.toastNotSvc.activateToastNotification("danger", "Debe loguearse para contar con la autenticación para esta acción");
        localStorage.clear();
        this.router.navigate(['/']);
      } else if (err.status === 404){ 
        if(err.error != undefined && err.error.message != undefined  && err.error.errors != null){ 
          this.toastNotSvc.activateToastNotification("danger", err.error.message + " - " + err.error.errors);
          return;
        } 
        this.toastNotSvc.activateToastNotification("danger", "Está intentando acceder a un recurso no disponible de la api, contacte con el administrador.");
      }  else if (err.status === 405){ 
        this.toastNotSvc.activateToastNotification("danger", "Metodo de acceso no permitido, intente mas tarde.");
      } 
      else if (err.status === 413){ 
        this.toastNotSvc.activateToastNotification("danger", "El tamaño de la solicitud supera el valor configurado.");
      } else if (err.status === 422){ 
        if(err.error != undefined &&  err.error.message != undefined  && err.error.errors != null){ 
          this.toastNotSvc.activateToastNotification("danger", err.error.message + " - " + err.error.errors);
          return;
        } else  if(err.error != undefined &&  err.error.message != undefined  ){ 
          this.toastNotSvc.activateToastNotification("danger", err.error.message );
          return;
        } 
        this.toastNotSvc.activateToastNotification("danger", "El servidor no logro procesar la solicitud enviada.");
      } else if (err.status === 500){ 
        this.toastNotSvc.activateToastNotification("danger", "Error de respuesta interno del servidor, contacte con el administrador.");
      }
      
      

    } else {
      this.toastNotSvc.activateToastNotification("danger", this.accesConst.messageErrorHttpGeneral);
    }
  }
}
