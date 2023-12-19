import { Injectable, inject } from '@angular/core';
import { SpinnerBgService } from 'projects/fy-lib-comp/src/services/spinner-bg.service';
import { ToastNotificationService } from 'projects/fy-lib-comp/src/services/toast-notification.service';
import { FyAccessConstantsService } from 'projects/fy-services/src/acces-conts/fy-access-constants.service';
import { FyCrudService } from 'projects/fy-services/src/http/fy-crud.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValoresFijosService {

  crudSvc = inject(FyCrudService);
  toastNotSvc = inject(ToastNotificationService);
  accesConstSvc = inject(FyAccessConstantsService)
  spinnerSvc = inject(SpinnerBgService);
  estadoOptios: any[];

  constructor() {
    this.crudSvc.urlBase = environment.urlApi;   
    this.estadoOptios = [
      { item: 'Enviada', fyClass: 'bg-info' },
      { item: 'Pendiente', fyClass: 'bg-warning' },
      { item: 'Activa', fyClass: 'bg-success' },
      { item: 'Rechazada', fyClass: 'bg-danger' },
      { item: 'Finalizada', fyClass: 'bg-secondary' },
    ];
    this.cargarValores();
  }

  valoresMensualidadesJson: any;
  valoresLicenciasJson: any;
  valoresActivacionesJson: any;
  precioActivacionCop: number | undefined;
  precioActivacionUsd: number | undefined;
  dias_duracion_activacion : number | undefined;
  definicion_activacion : string | undefined;
  cargarValores() {
    this.crudSvc.getAllItems("valores").subscribe({
      next: response => {
        console.log(response);
        this.valoresMensualidadesJson = response.data.mensualidades;
        this.valoresLicenciasJson = response.data.licencias;
        this.valoresActivacionesJson = response.data.activaciones;
        this.precioActivacionCop  = response.data.precio_activacion_cop;
        this.precioActivacionUsd  = response.data.precio_activacion_usd;
        this.dias_duracion_activacion  = response.data.dias_duracion_activacion;
        this. definicion_activacion  = response.data.definicion_activacion;
      },
      error: err => {
        console.log(err);
        this.toastNotSvc.activateToastNotification("danger", "No es posible cargar los datos del usuario, intente mas tarde.");
        this.spinnerSvc.closeSpinnerBg();
      }
    });
  }

  calcularMensualidad(estado: string){
    var estado = estado;
    var fondo = "";
    var mensaje = "";
    this.estadoOptios!.forEach(element => {
      if( estado == element.item){
        fondo = element.fyClass;
      }
    });
    mensaje = this.valoresMensualidadesJson[estado.toLowerCase()+"_texto"];
    return new Datos(estado, fondo, mensaje);
  }

  calcularActivacion(estado: string){
    var estado = estado;
    var fondo = "";
    var mensaje = "";
    this.estadoOptios!.forEach(element => {
      if( estado == element.item){
        fondo = element.fyClass;
      }
    });
    var precioCop = this.precioActivacionCop;
    var precioUsd = this.precioActivacionUsd;
    mensaje = this.valoresActivacionesJson[estado.toLowerCase()+"_texto"];
    return new DatosActivacion(estado, fondo, mensaje, precioCop!, precioUsd!, this.dias_duracion_activacion!, this.definicion_activacion!);
  }


  calcularLicencia(estado: string){
    var estado = estado;
    var fondo = "";
    var mensaje = "";
    this.estadoOptios!.forEach(element => {
      if( estado == element.item){
        fondo = element.fyClass;
      }
    });
    mensaje = this.valoresLicenciasJson[estado.toLowerCase()+"_texto"];
    return new Datos(estado, fondo, mensaje);
  }

}

class Datos {
  constructor(public estado: string, public fondo: string, public mensaje: string) {}
}

class DatosActivacion {
  constructor(public estado: string, public fondo: string, public mensaje: string, precioCop: number, precioUsd:number, dias_duracion_activacion: number, definicion_activacion: string ) {}
}