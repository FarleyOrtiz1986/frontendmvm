import { Component, OnInit, inject, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { SpinnerBgService } from 'projects/fy-lib-comp/src/services/spinner-bg.service';
import { ToastNotificationService } from 'projects/fy-lib-comp/src/services/toast-notification.service';
import { FyAccessConstantsService } from 'projects/fy-services/src/acces-conts/fy-access-constants.service';
import { FyErrorManagerService } from 'projects/fy-services/src/http/fy-error-manager.service';
import { FyBodyManagerService } from 'projects/fy-services/src/http/fy-body-manager.service';
import { FyCrudService } from 'projects/fy-services/src/http/fy-crud.service';
import { FyAuthService } from 'projects/fy-services/src/http/fy-auth.service';
import { Router } from '@angular/router';
import { ConversionsService } from 'projects/fy-services/src/conversions/conversions.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
        transform: 'translateX(0%)'
      })),
      state('false', style({
        transform: 'translateX(100%)'
      })),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('300ms ease-out'))
    ])
  ],
})
export class HomeComponent implements OnInit {

  authSvc = inject(FyAuthService);
  crudSvc = inject(FyCrudService);
  bodyHttp = inject(FyBodyManagerService);
  accesConstSvc = inject(FyAccessConstantsService);
  spinnerSvc = inject(SpinnerBgService);
  toastNotSvc = inject(ToastNotificationService);
  errorSvc = inject(FyErrorManagerService);
  converSvc = inject(ConversionsService);

  isEmail = this.accesConstSvc.regularExpressEmail;
  urlImgLocal = environment.urlImgLocal;
  urlImagesApi = environment.urlImagesApi;

  /**
   * Variables de gestion del usuario
   */
  usuario: any | undefined;
  usuario_id: number | undefined;
  url_usuario = this.urlImgLocal + "user.jpg";
  nombre = "";
  fyClassBadge = "";
  textEstate = "";

  cargoClientes = false;
  // tiposEstatus = environment.status;
  tiposEstatus : any[] | undefined;
  colsClientes: any[] | undefined;
  clientes: any[] | undefined;
  clienteSeleccionado: any| undefined;
  clientesSelected: any[] | undefined;

  listadoLlamada: any[] | undefined;

  formFiltrosYBusquedaClietes!: FormGroup; // Gestion del formulario 
  submitedFormFiltrosYBusquedaClietes = false;  // Gestion del formulario 

  formRegistroLlamada!: FormGroup; // Gestion del formulario 
  submitedRegistroLlamada = false;  // Gestion del formulario 


  formCambiarEstadoCliente!: FormGroup; // Gestion del formulario 
  submitedCambiarEstadoCliente = false;  // Gestion del formulario 

  constructor(
    private router: Router,
    private el: ElementRef,
    private fbFormFiltrosYBusquedaClientes: FormBuilder,
    private fbFormRegistroLlamadas: FormBuilder,
    private fbFormCambiarEstadoCliente: FormBuilder) {
    this.spinnerSvc.showSpinnerBg("Estamos cargando tú información al administrador");
    this.crudSvc.urlBase = environment.urlApi;
    this.authSvc.urlBase = environment.urlApi;
    this.clientes = [];
    this.clientesSelected = [];
    this.listadoLlamada = [];
    this.tiposEstatus = [];
    this.cargarStatus();
    this.initForm();
  }

  cargarStatus(){
    this.crudSvc.getAllItems("obtener-todos-los-status").subscribe({
      next: response => {
        console.log(response);
        this.clientes = [];
        this.clientesSelected = [];
        this.tiposEstatus = response.data;
        this.cargarUsuarioConClientes();
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
    
  }

  registrarLlamada(){
    if(this.observacionesLlamada!.value.trim().length  == 0){
      this.toastNotSvc.activateToastNotification("warning","Debes agregar la obervación que quieres asociar al cliente")
      return;
    }
    if(this.clienteSeleccionado == null || this.clienteSeleccionado == undefined){
      this.toastNotSvc.activateToastNotification("warning","Debes elegir el cliente al que le desear agregar la observación")
      return;
    }
  
    if (this.authSvc.getUsuarioAuthStorage() == undefined) {
      this.spinnerSvc.closeSpinnerBg();
      localStorage.clear();
      this.router.navigate(['/']);
    }
    this.spinnerSvc.showSpinnerBg("Guardando observación");
    const id = this.authSvc.getUsuarioAuthStorage().id;
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("usuario_id", id.toString());
    this.bodyHttp.formData!.append("cliente_id", this.clienteSeleccionado.id.toString());
    this.bodyHttp.formData!.append("observaciones", this.observacionesLlamada!.value);
    this.crudSvc.postGeneric("asociar-llamada", this.bodyHttp.formData).subscribe({
         next: response => {
          this.spinnerSvc.closeSpinnerBg();
            console.log(response);
            this.listadoLlamada?.unshift(response.data);
            this.toastNotSvc.activateToastNotification("success", response.message);
            this.observacionesLlamada?.setValue("");
            },
            error: err => {
              this.errorSvc.error(err);
            }
        });
    
  }

  cargarUsuarioConClientes(){
    if (this.authSvc.getUsuarioAuthStorage() == undefined) {
      this.spinnerSvc.closeSpinnerBg();
      localStorage.clear();
      this.router.navigate(['/']);
    }
    const id = this.authSvc.getUsuarioAuthStorage().id;
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("id", id.toString());
    
    //obetener-usuario-con-clientes
    this.crudSvc.postGeneric("obetener-usuario-con-clientes-y-llamadas-asociadas-a-clientes", this.bodyHttp.formData).subscribe({
         next: response => {
             console.log(response);
             var usuario = response.data;
             if(usuario.bloqueo == true) this.goToLogout();

             this.nombre = usuario.nombres;
             if (usuario.bloqueo == "false"  ||  usuario.bloqueo == "0" ||  usuario.bloqueo == 0 ) {
               this.fyClassBadge = 'bg-success';
               this.textEstate = "Activo";
             } else {
               this.fyClassBadge = 'bg-danger';
               this.textEstate = "Inactivo";
             }

            this.cargoClientes = true;
            if(usuario.clientes != undefined && usuario.clientes != null && usuario.clientes.length > 0){
              usuario.clientes.forEach((element: { nombres: any; nombreCompleto: string; apellido: string; id: any; search: any; telefono: any; correo: any; }) => 
              {
                if (element.nombres) {
                    element.nombreCompleto = element.nombres;
                }
                if (element.apellido) {
                    element.nombreCompleto = element.nombreCompleto + " " + element.apellido;
                }
                if(element.id){
                    element.search =    element.id.toString();
                }
                if(element.nombreCompleto){
                    element.search =   element.search + element.nombreCompleto;
                }
                if(element.telefono){
                    element.search =   element.search + element.telefono.toString();
                }
                if(element.correo){
                    element.search =   element.search + element.correo;
                }
              }
            );

                this.clientes =usuario.clientes;
                this.clientesSelected = usuario.clientes;
                this.clienteSeleccionado = this.clientesSelected![0];
                if(usuario.clientes && usuario.clientes.length > 0){
                  this.listadoLlamada = this.clientesSelected![0].llamadas;
                }
                this.selectedClientId = this.clienteSeleccionado.id;
                this.selectedClientIndex = 0;
                this.scrollContent('up');
            }


            },
            error: err => {
              this.errorSvc.error(err);
            }
        });
        
  }

  
  cambiarEstadoCliente(){
    console.log(this.nuevoEstado?.value);
    if(this.clienteSeleccionado == undefined){
      this.toastNotSvc.activateToastNotification("warning","Debe seleccionar un cliene para ejecutar el cambio de estatus");
      return;
    }
    if(this.nuevoEstado?.value == undefined   ||    this.nuevoEstado?.value.nombre == undefined ||    this.nuevoEstado?.value.nombre.length == 0 ){
      this.toastNotSvc.activateToastNotification("warning","Debes elegir el nuevo estado del cliente");
      return;
    }
    var nuevoEstado = this.nuevoEstado?.value.nombre
    if(this.clienteSeleccionado.estatus == nuevoEstado){
      this.toastNotSvc.activateToastNotification("warning","El cliente ya tiene el estado indicado");
      return;
    }
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("id", this.clienteSeleccionado.id.toString());
    this.bodyHttp.formData!.append("estatus", nuevoEstado);
    this.crudSvc.postGeneric("actualizar-estado-cliente", this.bodyHttp.formData).subscribe({
         next: response => {
          this.spinnerSvc.closeSpinnerBg();
            this.toastNotSvc.activateToastNotification("success", response.message);
            this.clientes!.forEach(element => {
              if(element.id == this.clienteSeleccionado.id){
                element.estatus = nuevoEstado;
              }
            });
            },
            error: err => {
              this.errorSvc.error(err);
            }
        });
  }

  ngOnInit(): void {
    this.spinnerSvc.closeSpinnerBg();
  }
  
  initForm() {
    this.formFiltrosYBusquedaClietes = this.fbFormFiltrosYBusquedaClientes.group({
      palabraClaveClientes: ['', Validators.compose([ Validators.maxLength(400)])],
      statusCliente: ['', Validators.compose([ Validators.maxLength(400)])],
    });

    this.formRegistroLlamada = this.fbFormRegistroLlamadas.group({
      observacionesLlamada: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
    });

    this.formCambiarEstadoCliente = this.fbFormCambiarEstadoCliente.group({
      nuevoEstado: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
    });

  }

  get palabraClaveClientes() { return this.formFiltrosYBusquedaClietes.get('palabraClaveClientes'); }
  get statusCliente() { return this.formFiltrosYBusquedaClietes.get('statusCliente'); }

  get observacionesLlamada() { return this.formRegistroLlamada.get('observacionesLlamada'); }
  
  get nuevoEstado() { return this.formCambiarEstadoCliente.get('nuevoEstado'); }
  

  scrollContent(direction: 'up' | 'down') {
    const contentElement: HTMLElement = this.el.nativeElement.querySelector('.content-card-list-crm');
    if (contentElement) {
      const selectedClientElement: HTMLElement | null = this.el.nativeElement.querySelector(`#client_${this.selectedClientId}`);
      if (selectedClientElement) {
        const clientHeight = selectedClientElement.clientHeight;
        const windowHeight = window.innerHeight;
        const targetScrollTop = selectedClientElement.offsetTop - (windowHeight / 2) + (clientHeight / 2);
        if (direction === 'up' && this.selectedClientIndex! > 0) {
          this.selectedClientIndex = this.selectedClientIndex! - 1;
          this.selectClient(this.clientesSelected![this.selectedClientIndex], this.selectedClientIndex);
        } else if (direction === 'down' && this.selectedClientIndex! < this.clientesSelected!.length - 1) {
          this.selectedClientIndex = this.selectedClientIndex! + 1;
          this.selectClient(this.clientesSelected![this.selectedClientIndex], this.selectedClientIndex);
        }
        this.smoothScrollTo(contentElement, targetScrollTop, 500); // 1000 milliseconds (1 second) duration
      }
    }
  }
  
  smoothScrollTo(element: HTMLElement, targetScrollTop: number, duration: number) {
    const startTime = performance.now();
    const startScrollTop = element.scrollTop;
    function scroll(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollTop = startScrollTop + (targetScrollTop - startScrollTop) * progress;
      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    }
    requestAnimationFrame(scroll);
  }

  
  actualizarLista(){
    this.cargoClientes = false;
    this.clienteSeleccionado = undefined;
    this.clientes = [];
    this.clientesSelected = [];
    //aqui
    //this.cargarClientesEnCiclo(5000, 1);
    this.cargarUsuarioConClientes();
  }
  

  selectedClientId: number | undefined;
  selectedClientIndex: number | undefined;
  selectClient(cliente: any, indexCliente: number) {
    this.selectedClientId = cliente.id;
    this.clienteSeleccionado = cliente;
    this.selectedClientIndex = indexCliente;
    this.listadoLlamada = [];
    this.listadoLlamada = cliente.llamadas;

    console.log( this.selectedClientIndex);
  }


  /**
   * 
   * @param per_page  Número de elementos por página
   * @param page  Número de página actual
   */
  // cargarClientesEnCiclo(per_page: number, page: number) {
  //   this.bodyHttp.create();
  //   this.bodyHttp.formData!.append("per_page", per_page.toString());
  //   this.bodyHttp.formData!.append("page", page.toString());
  //   this.crudSvc.postGeneric("obtener-todos-los-clientes-en-ciclo", this.bodyHttp.formData).subscribe({
  //     next: response => {
  //       console.log(response);
  //       if (page == 1) {
  //         this.cargoClientes = true;
  //       }
  //       if (response.data.length == 0) {
  //         if(this.clienteSeleccionado == undefined){
  //           if(this.clientes && this.clientes.length>0){
  //             this.clienteSeleccionado = this.clientes[0];
  //             this.selectedClientId = this.clienteSeleccionado.id;
  //             this.selectedClientIndex = 0;
  //             this.scrollContent('up');
  //           }
  //         }
  //         this.cargoClientes = true;
  //         return
  //       }
  //       response.data.forEach((element: { nombres: any; nombreCompleto: string; apellido: string; id: any; search: any; telefono: any; correo: any; }) => {
  //         if (element.nombres) {
  //           element.nombreCompleto = element.nombres;
  //         }
  //         if (element.apellido) {
  //           element.nombreCompleto = element.nombreCompleto + " " + element.apellido;
  //         }
  //         if(element.id){
  //           element.search =    element.id.toString();
  //         }
  //         if(element.nombreCompleto){
  //           element.search =   element.search + element.nombreCompleto;
  //         }
  //         if(element.telefono){
  //           element.search =   element.search + element.telefono.toString();
  //         }
  //         if(element.correo){
  //           element.search =   element.search + element.correo;
  //         }
  //       });
  //       if (typeof this.clientes !== 'undefined' && Array.isArray(this.clientes)) {
  //         this.clientesSelected = this.clientes = this.clientes.concat(this.converSvc.formatDateCrateUpdate(response.data));
  //         console.log(this.clientes);
  //       } else {
  //         this.clientesSelected =  this.clientes = this.converSvc.formatDateCrateUpdate(response.data);
  //         console.log(this.clientes);
  //       }
  //       page++;
  //       this.cargarClientesEnCiclo(per_page, page);
  //     },
  //     error: err => {
  //       this.errorSvc.error(err);
  //     }
  //   });
  // }

  quitarFiltrosClientes(){ 
    this.cargoClientes = false;
    this.clientesSelected = this.clientes;
    setTimeout(() => {
      this.cargoClientes = true;
      this.formFiltrosYBusquedaClietes.reset();
      this.toastNotSvc.activateToastNotification("success", "Filtros eliminados con exito")
    }, 2000);
  }

    /**
   * Metodo que ejecuta la busqueda de las palabras coincidentes en los campos correspondientes
   */
    searchBuscarClientePalabraClave() {
      if(this.clientes?.length == 0){
        this.toastNotSvc.activateToastNotification("warning","No hay elementos en la lista de clientes");
        return;
      }
      if(!this.palabraClaveClientes || this.palabraClaveClientes!.value == null || this.palabraClaveClientes!.value == undefined || this.palabraClaveClientes!.value.trim().length == 0){
        this.toastNotSvc.activateToastNotification("warning","Debe ingresar la la plabra clave a buscar");
        return;
      }
      this.cargoClientes = false;
      this.clientesSelected = this.clientes;
     var searchTerm = this.palabraClaveClientes!.value.trim();
     console.log("searchBuscarClientePalabraClave()");
     this.clientesSelected =  this.clientesSelected!.filter(item => {
        let subStringNormalized = searchTerm.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, "");
        let mainStringNormalizedTema = item.search.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, "");  
        return (
          mainStringNormalizedTema.includes(subStringNormalized) 
        );
      });
      console.log(this.clientesSelected);
      setTimeout(() => {
        this.cargoClientes = true;
        this.toastNotSvc.activateToastNotification("success", this.clientesSelected?.length + " clientes encontrados")
      }, 2000);

      this.listadoLlamada = [];
      if(this.clientesSelected.length > 0){
        this.listadoLlamada = this.clientesSelected[0].llamadas;
      }
    }



    searchBuscarClientePorStatus() {
      if(this.clientes?.length == 0){
        this.toastNotSvc.activateToastNotification("warning","No hay elementos en la lista de clientes");
        return;
      }
      console.log(this.statusCliente!.value)
      if(!this.statusCliente || this.statusCliente!.value == null || this.statusCliente!.value == undefined || this.statusCliente!.value.length == 0 
        || this.statusCliente!.value.nombre == null || this.statusCliente!.value.nombre == undefined ){
        this.toastNotSvc.activateToastNotification("warning","Debe ingresar la la plabra clave a buscar");
        return;
      }

      console.log(this.statusCliente!.value)

      this.cargoClientes = false;
      this.clientesSelected = this.clientes;
     var searchTerm = this.statusCliente!.value.nombre;
     console.log("searchBuscarClientePalabraClave()");
     this.clientesSelected =  this.clientesSelected!.filter(item => {
        let subStringNormalized = searchTerm.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, "");
        let mainStringNormalizedTema = item.estatus.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, "");  
        return (
          mainStringNormalizedTema.includes(subStringNormalized) 
        );
      });
      console.log(this.clientesSelected);
      setTimeout(() => {
        this.cargoClientes = true;
        this.toastNotSvc.activateToastNotification("success", this.clientesSelected?.length + " clientes encontrados")
      }, 2000);
    }

  
 

  goToProfile() {
  }

  goToLogout() {
    this.authSvc.closeSession('close-sesion');
  }

  sinAccion(){}

  getSeverity(option_status: string) {
    for (const element of this.tiposEstatus!) {
      if (element.nombre == option_status) {
        return element.status;
      }
    }
    return "info";
  }

  isBoxVisibleListClientesCrm = false;

  toggleBoxListClientesCrmBusquedaYFiltros() {
    this.isBoxVisibleListClientesCrm = !this.isBoxVisibleListClientesCrm;
  }
























































































  initColsClientes() {
    this.colsClientes = [
      { header: 'Nombres', field: 'nombreCompleto', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Status', field: 'estatus', type: "list-status", representative: this.tiposEstatus, option_label: "nombre", option_status: "status", min_width: 150, max_width: 150 },
    ];
  }






}



































  // scrollContent(direction: 'up' | 'down') {
  //   const contentElement: HTMLElement = this.el.nativeElement.querySelector('.content-card-list-crm');
  
  //   if (contentElement) {
  //     const selectedClientElement: HTMLElement | null = this.el.nativeElement.querySelector(`#client_${this.selectedClientId}`);
  
  //     if (selectedClientElement) {
  //       const clientHeight = selectedClientElement.clientHeight;
  //       const windowHeight = window.innerHeight;
  //       const scrollTop = selectedClientElement.offsetTop - (windowHeight / 2) + (clientHeight / 2);
  
  //       if (direction === 'up' && this.selectedClientIndex! > 0) {
  //         this.selectedClientIndex = this.selectedClientIndex! - 1;
  //         this.selectClient(this.clientesSelected![this.selectedClientIndex], this.selectedClientIndex);
  //         contentElement.scrollTop = scrollTop;
  //       } else if (direction === 'down' && this.selectedClientIndex! < this.clientesSelected!.length - 1) {
  //         this.selectedClientIndex = this.selectedClientIndex! + 1;
  //         this.selectClient(this.clientesSelected![this.selectedClientIndex], this.selectedClientIndex);
  //         contentElement.scrollTop = scrollTop;
  //       }
  //     }
  //   }
  // }


  // scrollContent(direction: 'up' | 'down') {
  //   const contentElement: HTMLElement = this.el.nativeElement.querySelector('.content-card-list-crm');
  
  //   if (contentElement) {
  //     const selectedClientElement: HTMLElement | null = this.el.nativeElement.querySelector(`#client_${this.selectedClientId}`);
  
  //     if (selectedClientElement) {
  //       const clientHeight = selectedClientElement.clientHeight;
  //       const windowHeight = window.innerHeight;
  //       const scrollTop = selectedClientElement.offsetTop - (windowHeight / 2) + (clientHeight / 2);
  
  //       if (direction === 'up' && this.selectedClientIndex! > 0) {
  //         this.selectedClientIndex = this.selectedClientIndex! - 1;
  //         this.selectClient(this.clientesSelected![this.selectedClientIndex], this.selectedClientIndex);
  //         contentElement.scrollTo({ top: scrollTop, behavior: 'smooth' });
  //         contentElement.scrollTo({ top: scrollTop, behavior: 'smooth', duration: 1000 });
  //       } else if (direction === 'down' && this.selectedClientIndex! < this.clientesSelected!.length - 1) {
  //         this.selectedClientIndex = this.selectedClientIndex! + 1;
  //         this.selectClient(this.clientesSelected![this.selectedClientIndex], this.selectedClientIndex);
  //         contentElement.scrollTo({ top: scrollTop, behavior: 'smooth', duration: 1000 });
  //       }
  //     }
  //   }
  // }




    //       if (page == 1) {
      //         this.cargoClientes = true;
      //       }
      //       if (response.data.length == 0) {
      //         if(this.clienteSeleccionado == undefined){
      //           if(this.clientes && this.clientes.length>0){
      //             this.clienteSeleccionado = this.clientes[0];
      //             this.selectedClientId = this.clienteSeleccionado.id;
      //             this.selectedClientIndex = 0;
      //             this.scrollContent('up');
      //           }
      //         }
      //         this.cargoClientes = true;
      //         return
      //       }
      //       response.data.forEach((element: { nombres: any; nombreCompleto: string; apellido: string; id: any; search: any; telefono: any; correo: any; }) => {
      //         if (element.nombres) {
      //           element.nombreCompleto = element.nombres;
      //         }
      //         if (element.apellido) {
      //           element.nombreCompleto = element.nombreCompleto + " " + element.apellido;
      //         }
      //         if(element.id){
      //           element.search =    element.id.toString();
      //         }
      //         if(element.nombreCompleto){
      //           element.search =   element.search + element.nombreCompleto;
      //         }
      //         if(element.telefono){
      //           element.search =   element.search + element.telefono.toString();
      //         }
      //         if(element.correo){
      //           element.search =   element.search + element.correo;
      //         }
      //       });
      //       if (typeof this.clientes !== 'undefined' && Array.isArray(this.clientes)) {
      //         this.clientesSelected = this.clientes = this.clientes.concat(this.converSvc.formatDateCrateUpdate(response.data));
      //         console.log(this.clientes);
      //       } else {
      //         this.clientesSelected =  this.clientes = this.converSvc.formatDateCrateUpdate(response.data);
      //         console.log(this.clientes);
      //       }
      //       page++;
      //       this.cargarClientesEnCiclo(per_page, page);
      //     },
      //     error: err => {
      //       this.errorSvc.error(err);
      //     }
      //   });
    
  

          
   

      
   

      // cargarClientesEnCiclo(per_page: number, page: number) {
  //     //   this.bodyHttp.formData!.append("page", page.toString());
  //   this.crudSvc.postGeneric("obtener-todos-los-clientes-en-ciclo", this.bodyHttp.formData).subscribe({
  //     next: response => {
  //       console.log(response);
  //       if (page == 1) {
  //         this.cargoClientes = true;
  //       }
  //       if (response.data.length == 0) {
  //         if(this.clienteSeleccionado == undefined){
  //           if(this.clientes && this.clientes.length>0){
  //             this.clienteSeleccionado = this.clientes[0];
  //             this.selectedClientId = this.clienteSeleccionado.id;
  //             this.selectedClientIndex = 0;
  //             this.scrollContent('up');
  //           }
  //         }
  //         this.cargoClientes = true;
  //         return
  //       }
  //       response.data.forEach((element: { nombres: any; nombreCompleto: string; apellido: string; id: any; search: any; telefono: any; correo: any; }) => {
  //         if (element.nombres) {
  //           element.nombreCompleto = element.nombres;
  //         }
  //         if (element.apellido) {
  //           element.nombreCompleto = element.nombreCompleto + " " + element.apellido;
  //         }
  //         if(element.id){
  //           element.search =    element.id.toString();
  //         }
  //         if(element.nombreCompleto){
  //           element.search =   element.search + element.nombreCompleto;
  //         }
  //         if(element.telefono){
  //           element.search =   element.search + element.telefono.toString();
  //         }
  //         if(element.correo){
  //           element.search =   element.search + element.correo;
  //         }
  //       });
  //       if (typeof this.clientes !== 'undefined' && Array.isArray(this.clientes)) {
  //         this.clientesSelected = this.clientes = this.clientes.concat(this.converSvc.formatDateCrateUpdate(response.data));
  //         console.log(this.clientes);
  //       } else {
  //         this.clientesSelected =  this.clientes = this.converSvc.formatDateCrateUpdate(response.data);
  //         console.log(this.clientes);
  //       }
  //       page++;
  //       this.cargarClientesEnCiclo(per_page, page);
  //     },
  //     error: err => {
  //       this.errorSvc.error(err);
  //     }
  //   });
  
