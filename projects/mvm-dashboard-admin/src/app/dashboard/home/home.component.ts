import { Component, OnInit, inject } from '@angular/core';
import { SpinnerBgService } from 'projects/fy-lib-comp/src/services/spinner-bg.service';
import { ToastNotificationService } from 'projects/fy-lib-comp/src/services/toast-notification.service';
import { FyAccessConstantsService } from 'projects/fy-services/src/acces-conts/fy-access-constants.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FyErrorManagerService } from 'projects/fy-services/src/http/fy-error-manager.service';
import { FyBodyManagerService } from 'projects/fy-services/src/http/fy-body-manager.service';
import { FyCrudService } from 'projects/fy-services/src/http/fy-crud.service';
import { FyAuthService } from 'projects/fy-services/src/http/fy-auth.service';
import { environment } from '../../environments/environment';
import { Cliente } from '../../core/models/cliente.interface';
import { FyFileManagerService } from 'projects/fy-services/src/files/fy-file-manager.service';
import { ConversionsService } from 'projects/fy-services/src/conversions/conversions.service';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authSvc = inject(FyAuthService);
  crudSvc = inject(FyCrudService);
  bodyHttp = inject(FyBodyManagerService);
  accesConstSvc = inject(FyAccessConstantsService);
  spinnerSvc = inject(SpinnerBgService);
  toastNotSvc = inject(ToastNotificationService);
  errorSvc = inject(FyErrorManagerService)
  fileMang = inject(FyFileManagerService);
  converSvc = inject(ConversionsService);

  isEmail = this.accesConstSvc.regularExpressEmail;
  urlImgLocal = environment.urlImgLocal;
  url_usuario = ""

  visibleModalLlamadas = false;
  cargoLlamadas = false;
  colsLlamadas: any[] | undefined;
  llamadas: any[] | undefined;


  

  visibleModalNuevoCliente = false;
  formCrearActualizarCliente!: FormGroup; // Gestion del formulario 
  submitedFormCrearActualizarCliente = false;  // Gestion del formulario 
  formAsignarClientes!: FormGroup; // Gestion del formulario 
  submitedFormAsignarClientes = false;  // Gestion del formulario 
  cargoClientes = false;
  tiposEstatus : any[] | undefined;
  colsClientes: any[] | undefined;
  clientes: any[] | undefined;

  visibleModalNuevoUsuario = false;
  formCrearActualizarUsuario!: FormGroup; // Gestion del formulario 
  submitedFormCrearActualizarUsuario = false;  // Gestion del formulario 
  cargoUsuarios = false;
  colsUsuarios: any[] | undefined;
  colsUsuariosParaAsignacion: any[] | undefined;
  usuarios: any[] | undefined;
  tiposDocumentos = environment.tipos_documentos;
  password = "";

  visibleModalStatus = false;
  formStatus!: FormGroup; // Gestion del formulario 
  submitedFormStatus = false;  // Gestion del formulario 
  cargoStatus = false;
  colsStatus: any[] | undefined;

  tipoEtiquetas = environment.tipos_etiquetas;

  formCambiarEstadoCliente!: FormGroup; // Gestion del formulario 
  submitedCambiarEstadoCliente = false;  // Gestion del formulario 

  constructor(private fbFormCrearActualizarCliente: FormBuilder, private fbFormCrearActualizarUsuario: FormBuilder,
    private fbFormStatus: FormBuilder, private fbFormCambiarEstadoCliente: FormBuilder, private clipboard: Clipboard) {
    this.clientes = [];
    this.usuarios = [];
    this.clientesSeleccionados = [];
    this.asesoresSeleccionados = [];
    this.tiposEstatus = [];
    this.spinnerSvc.showSpinnerBg("Estamos cargando la información al administrador");
    this.crudSvc.urlBase = environment.urlApi;
    this.authSvc.urlBase = environment.urlApi;
    this.url_usuario = this.urlImgLocal + "user.jpg";
    this.initForm();
    this.cargarStatus();
  }


  cargarStatus() {
    this.crudSvc.getAllItems("obtener-todos-los-status").subscribe({
      next: response => {
        this.tiposEstatus = response.data;
        this.initColsStatus();
        this.cargoStatus = true;
        this.usuarios = [];
        this.clientes = [];
        this.initColsClientes();
        this.initColsUsuarios();
        this.initColsUsuariosParaAsignacion();
        this.cargarClientesEnCiclo(5000, 1);
        this.cargarUsuariosEnCiclo(5000, 1);
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });

  }


  cambiarEstadoCliente(){
    // console.log(this.nuevoEstado?.value);
     if(this.clientesSeleccionados == undefined || this.clientesSeleccionados.length == 0){
       this.toastNotSvc.activateToastNotification("warning","Debe seleccionar minimo un cliene para ejecutar el cambio de estatus");
       return;
     } 
     if(this.nuevoEstado?.value == undefined  || this.nuevoEstado?.value.nombre == undefined ||     this.nuevoEstado?.value.nombre.length == 0 ){
       this.toastNotSvc.activateToastNotification("warning","Debes elegir el nuevo estado del cliente");
       return;
     }
    console.log(this.clientesSeleccionados);
     var nuevoEstado = this.nuevoEstado?.value.nombre
     this.spinnerSvc.showSpinnerBg("Estamos cambiando el estado de los clientes seleccionados...")
     this.bodyHttp.create();
     this.bodyHttp.formData!.append("clientes_a_cambiar_estado", JSON.stringify(this.clientesSeleccionados));
     this.bodyHttp.formData!.append("estatus", nuevoEstado);
     this.crudSvc.postGeneric("cambiar-estado-a-clientes-de-manera-masiva", this.bodyHttp.formData).subscribe({
       next: response => {
        this.clientes = [];
        this.cargarClientesEnCiclo(5000, 1);
         this.spinnerSvc.closeSpinnerBg();
         this.toastNotSvc.activateToastNotification("success", response.message);
         this.visibleModalGestionSeleccionCliente = false;
       },
       error: err => {
         this.errorSvc.error(err);
       }
     });
   
  }


  initColsStatus() {
    this.colsStatus = [
      { header: 'Nombre', field: 'nombre', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Status', field: 'status', type: "list-status", representative: this.tiposEstatus, option_label: "status", option_status: "status", min_width: 150, max_width: 150 },
    ];
  }

  eliminarStatus(object: any) {
    this.spinnerSvc.showSpinnerBg("Eliminando status");
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("id", object.id);
    this.crudSvc.postGeneric("eliminar-status", this.bodyHttp.formData).subscribe({
      next: response => {
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.spinnerSvc.closeSpinnerBg();
        this.tiposEstatus = [];
        this.tiposEstatus = response.data;
        this.initColsStatus();
        this.usuarios = [];
        this.clientes = [];
        this.initColsClientes();
        this.initColsUsuarios();
        this.initColsUsuariosParaAsignacion();
        this.cargarClientesEnCiclo(5000, 1);
        this.cargarUsuariosEnCiclo(5000, 1);
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }


  crearStatus() {
    if (this.formStatus.invalid) {
      this.submitedFormStatus = true;
      return;
    }
    this.spinnerSvc.showSpinnerBg("Creando nuevo status");
    var nombre = this.nombre?.value;
    var status = this.statuses?.value.nombre;
    var descripcion = this.descripcion?.value;
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("nombre", nombre);
    this.bodyHttp.formData!.append("status", status);
    this.bodyHttp.formData?.append("descripcion", descripcion);
    this.crudSvc.postGeneric("crear-status", this.bodyHttp.formData).subscribe({
      next: response => {
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.spinnerSvc.closeSpinnerBg();
        this.tiposEstatus = [];
        this.tiposEstatus = response.data;
        this.initColsStatus();
        this.usuarios = [];
        this.clientes = [];
        this.initColsClientes();
        this.initColsUsuarios();
        this.initColsUsuariosParaAsignacion();
        this.formStatus.reset();
        this.cargarClientesEnCiclo(5000, 1);
        this.cargarUsuariosEnCiclo(5000, 1);
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }

  copiar(text: string) {
    this.clipboard.copy(text);
    this.toastNotSvc.activateToastNotification("info", "Dato copiado con éxito.");
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinnerSvc.closeSpinnerBg();
    }, 2000);
  }

  initForm() {
    this.formCrearActualizarCliente = this.fbFormCrearActualizarCliente.group({
      nombres: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      apellidos: ['', Validators.compose([Validators.maxLength(400)])],
      correo: ['', Validators.compose([Validators.required, Validators.maxLength(400), Validators.pattern(this.isEmail)])],
      pais: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      telefono: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      campana: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      status: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      retencion: [false, Validators.compose([Validators.required])]
    });

    this.formCrearActualizarUsuario = this.fbFormCrearActualizarUsuario.group({
      nombresUsuario: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      apellidosUsuario: ['', Validators.compose([Validators.maxLength(400)])],
      emailUsuario: ['', Validators.compose([Validators.required, Validators.maxLength(400), Validators.pattern(this.isEmail)])],
      tipo_documentoUsuario: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      documentoUsuario: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      telefono_celularUsuario: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      telefono_whatsappUsuario: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      bloqueoUsuario: [false, Validators.compose([Validators.required])]
    });

    this.formAsignarClientes = this.fbFormCrearActualizarUsuario.group({
      nmrClientesSinAsignar: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      asesorSeleccionadoAsignar: ['', Validators.compose([Validators.maxLength(400)])],
    });

    this.formStatus = this.fbFormStatus.group({
      nombre: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      statuses: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
      descripcion: ['', Validators.compose([])],
    });

    this.formCambiarEstadoCliente = this.fbFormCambiarEstadoCliente.group({
      nuevoEstado: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
    });

  }


  get nmrClientesSinAsignar() { return this.formAsignarClientes.get('nmrClientesSinAsignar'); }
  get asesorSeleccionadoAsignar() { return this.formAsignarClientes.get('asesorSeleccionadoAsignar'); }

  get nombre() { return this.formStatus.get('nombre'); }
  get statuses() { return this.formStatus.get('statuses'); }
  get descripcion() { return this.formStatus.get('descripcion'); }

  get nuevoEstado() { return this.formCambiarEstadoCliente.get('nuevoEstado'); }

  visibleModalGestionSeleccionCliente = false;
  clientesSeleccionados: any[] | undefined;
  usarSeleccionDeClientes(object: any) {
    this.visibleModalGestionSeleccionCliente = true;
    this.clientesSeleccionados = object;
  }


  visibleModalGestionSeleccionAsesores = false;
  asesoresSeleccionados: any[] | undefined;
  usarSeleccionDeAsesores(object: any) {
    this.visibleModalGestionSeleccionAsesores = true;
    this.asesoresSeleccionados = object;
  }

  seleccionarEstosClientes() {
    if (this.formAsignarClientes.invalid) {
      this.submitedFormAsignarClientes = true;
      return;
    }
    if (this.nmrClientesSinAsignar?.value <= 0) {
      this.toastNotSvc.activateToastNotification("warning", "Debes elegir una cantidad mayor a cero");
      return;
    }
    // this.spinnerSvc.showSpinnerBg("Buscando lista de clientes sin asignar");
    this.clientesSeleccionados = [];
    var contSelecteds = 0;
    for (const element of this.clientes!) {
      if (contSelecteds == this.nmrClientesSinAsignar?.value) {
        break; // Salir del bucle si se cumple la condición
      }
      if (element.usuario_id == null || element.usuario_id == undefined) {
        this.clientesSeleccionados!.push(element);
        contSelecteds = contSelecteds + 1;
      }
    }
  }


  get nombres() { return this.formCrearActualizarCliente.get('nombres'); }
  get apellidos() { return this.formCrearActualizarCliente.get('apellidos'); }
  get correo() { return this.formCrearActualizarCliente.get('correo'); }
  get pais() { return this.formCrearActualizarCliente.get('pais'); }
  get telefono() { return this.formCrearActualizarCliente.get('telefono'); }
  get status() { return this.formCrearActualizarCliente.get('status'); }
  get retencion() { return this.formCrearActualizarCliente.get('retencion'); }
  get campana() { return this.formCrearActualizarCliente.get('campana'); }

  get nombresUsuario() { return this.formCrearActualizarUsuario.get('nombresUsuario'); }
  get apellidosUsuario() { return this.formCrearActualizarUsuario.get('apellidosUsuario'); }
  get emailUsuario() { return this.formCrearActualizarUsuario.get('emailUsuario'); }
  get tipo_documentoUsuario() { return this.formCrearActualizarUsuario.get('tipo_documentoUsuario'); }
  get documentoUsuario() { return this.formCrearActualizarUsuario.get('documentoUsuario'); }
  get telefono_celularUsuario() { return this.formCrearActualizarUsuario.get('telefono_celularUsuario'); }
  get telefono_whatsappUsuario() { return this.formCrearActualizarUsuario.get('telefono_whatsappUsuario'); }
  get bloqueoUsuario() { return this.formCrearActualizarUsuario.get('bloqueoUsuario'); }

  /**
   * 
   * @param per_page  Número de elementos por página
   * @param page  Número de página actual
   */
  cargarUsuariosEnCiclo(per_page: number, page: number) {
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("per_page", per_page.toString());
    this.bodyHttp.formData!.append("page", page.toString());
    this.crudSvc.postGeneric("obtener-todos-los-usuarios-en-ciclo", this.bodyHttp.formData).subscribe({
      next: response => {
        if (page == 1) {
          this.cargoUsuarios = true;
        }
        if (response.data.length == 0) {
          this.cargoUsuarios = true;
          return
        }
        response.data.forEach((element: { nombres: string; apellidos: string; nombreCompleto: string; clientes_count: string; } | null | undefined) => {
          if (element != undefined && element != null && element.nombres && element.apellidos) {
            element.nombreCompleto = element.nombres + " " + element.apellidos + " -> Clientes: " + element.clientes_count;
          } else {
            element!.nombreCompleto = "NOMBRE NO ASIGNADO";
          }
        });
        if (typeof this.usuarios !== 'undefined' && Array.isArray(this.usuarios)) {
          this.usuarios = this.usuarios.concat(this.converSvc.formatDateCrateUpdate(response.data));
        } else {
          this.usuarios = this.converSvc.formatDateCrateUpdate(response.data);
        }
        page++;
        this.cargarUsuariosEnCiclo(per_page, page);
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }

  /**
   * 
   * @param per_page  Número de elementos por página
   * @param page  Número de página actual
   */
  cargarClientesEnCiclo(per_page: number, page: number) {
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("per_page", per_page.toString());
    this.bodyHttp.formData!.append("page", page.toString());
    this.crudSvc.postGeneric("obtener-todos-los-clientes-en-ciclo", this.bodyHttp.formData).subscribe({
      next: response => {
        console.log(response);
        if (page == 1) {
          this.cargoClientes = true;
        }
        if (response.data.length == 0) {
          this.cargoClientes = true;
          return
        }
        response.data.forEach((element: { usuario: { nombres: string; apellidos: string; } | null | undefined; asesor: string; llamadas: string | any[] | null | undefined; ultimaLlamada: Date  | undefined; retencion: boolean; } | null | undefined) => {
          if (element!.usuario != undefined && element!.usuario != null && element!.usuario.nombres && element!.usuario.apellidos) {
            element!.asesor = element!.usuario.nombres + " " + element!.usuario.apellidos;
          } else {
            element!.asesor = "SIN ASIGNAR";
          }

          if (element!.llamadas != undefined && element!.llamadas != null && element!.llamadas.length > 0 ) {
            element!.ultimaLlamada =  new Date(element!.llamadas[0].fecha_llamada); 
          } else {
            element!.ultimaLlamada = undefined;
          }

          if (element != undefined && element != null && element.retencion) {
            if (element.retencion.toString() == "1") {
              element.retencion = true;
            } else {
              element.retencion = false;
            }
          } else {
            element!.retencion = false;
          }


        });
        if (typeof this.clientes !== 'undefined' && Array.isArray(this.clientes)) {
          this.clientes = this.clientes.concat(this.converSvc.formatDateCrateUpdate(response.data));
        } else {
          this.clientes = this.converSvc.formatDateCrateUpdate(response.data);
        }
        page++;
        this.cargarClientesEnCiclo(per_page, page);
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }

  cargarClientes() {
    this.crudSvc.getAllItems("obtener-todos-los-clientes").subscribe({
      next: response => {
        const formattedData = response.data.map((item: { created_at: string | number | Date; updated_at: string | number | Date; }) => {
          const createdAtDate = new Date(item.created_at);
          const updatedAtDate = new Date(item.updated_at);
          return {
            ...item,
            created: createdAtDate,
            updated: updatedAtDate,
          };
        });
        this.clientes = formattedData;
        this.cargoClientes = true;
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }

  limpiarFormularioAsesor() {
    this.password = "";
    this.usuarioElegido = undefined;
    this.formCrearActualizarUsuario.reset();
    this.bloqueoUsuario?.setValue(false);
  }

  limpiarFormularioCliente() {
    this.clienteElegido = undefined;
    this.formCrearActualizarCliente.reset();
    this.retencion?.setValue(false);
  }

  restaurarContrasena() {
    if (this.usuarioElegido == undefined) {
      this.toastNotSvc.activateToastNotification("warning", "Debe elegir un usuario para restaurar contraseña")
      return;
    }
    this.spinnerSvc.showSpinnerBg("Restaurando contraseña");
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("id", this.usuarioElegido.id.toString());
    this.crudSvc.postGeneric("restaurar-contrasena", this.bodyHttp.formData).subscribe({
      next: response => {
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.spinnerSvc.closeSpinnerBg();
        this.password = response.data.password;
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }


  usuarioElegido: any;
  crearActualizarUsuario() {
    if (this.formCrearActualizarUsuario.invalid) {
      this.submitedFormCrearActualizarUsuario = true;
      return;
    }
    this.spinnerSvc.showSpinnerBg("Gestionando datos del asesor");
    var id = -1;
    if (this.usuarioElegido != undefined) {
      id = this.usuarioElegido!.id;
    }
    var nombres = this.nombresUsuario?.value;
    var apellidos = this.apellidosUsuario?.value;
    var email = this.emailUsuario?.value;
    var telefono_celular = this.telefono_celularUsuario?.value;
    var telefono_whatsapp = this.telefono_whatsappUsuario?.value;
    var tipo_documento = this.tipo_documentoUsuario?.value.nombre;
    var documentoUsuario = this.documentoUsuario?.value;
    var bloqueo = this.bloqueoUsuario?.value;
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("id", id.toString());
    this.bodyHttp.formData!.append("nombres", nombres);
    this.bodyHttp.formData?.append("apellidos", apellidos);
    this.bodyHttp.formData?.append("email", email);
    this.bodyHttp.formData?.append("telefono_celular", telefono_celular);
    this.bodyHttp.formData?.append("telefono_whatsapp", telefono_whatsapp);
    this.bodyHttp.formData?.append("tipo_documento", tipo_documento);
    this.bodyHttp.formData?.append("documento", documentoUsuario);
    this.bodyHttp.formData?.append("bloqueo", bloqueo.toString());
    if (id == -1) {
      this.crudSvc.postGeneric("crear-usuario", this.bodyHttp.formData).subscribe({
        next: response => {
          this.toastNotSvc.activateToastNotification("success", response.message);
          this.spinnerSvc.closeSpinnerBg();
          this.usuarioElegido = response.data.usuario;
          this.nombresUsuario?.setValue(this.usuarioElegido.nombres)
          this.apellidosUsuario?.setValue(this.usuarioElegido.apellidos);
          this.emailUsuario?.setValue(this.usuarioElegido.email);
          this.telefono_celularUsuario?.setValue(this.usuarioElegido.telefono_celular);
          this.telefono_whatsappUsuario?.setValue(this.usuarioElegido.telefono_whatsapp);
          this.tiposDocumentos.forEach(element => {
            if (element.nombre == this.usuarioElegido.tipo_documento) {
              this.tipo_documentoUsuario?.setValue(element);
            }
          });
          this.documentoUsuario?.setValue(this.usuarioElegido.documento);
          this.bloqueoUsuario?.setValue(this.usuarioElegido.bloqueo);
          this.password = response.data.password;
          this.usuarios = [];
          this.cargarUsuariosEnCiclo(5000, 1);
        },
        error: err => {
          this.errorSvc.error(err);
        }
      });
    } else {
      this.crudSvc.postGeneric("actualizar-usuario", this.bodyHttp.formData).subscribe({
        next: response => {
          console.log(response);
          this.toastNotSvc.activateToastNotification("success", response.message);
          this.spinnerSvc.closeSpinnerBg();
          this.usuarioElegido = response.data.usuario;
          this.nombresUsuario?.setValue(this.usuarioElegido.nombres)
          this.apellidosUsuario?.setValue(this.usuarioElegido.apellidos);
          this.emailUsuario?.setValue(this.usuarioElegido.email);
          this.telefono_celularUsuario?.setValue(this.usuarioElegido.telefono_celular);
          this.telefono_whatsappUsuario?.setValue(this.usuarioElegido.telefono_whatsapp);
          this.tiposDocumentos.forEach(element => {
            if (element.nombre == this.usuarioElegido.tipo_documento) {
              this.tipo_documentoUsuario?.setValue(element);
            }
          });
          this.documentoUsuario?.setValue(this.usuarioElegido.documento);
          this.bloqueoUsuario?.setValue(this.usuarioElegido.bloqueo);
          this.password = response.data.password;
          this.usuarios = [];
          this.cargarUsuariosEnCiclo(5000, 1);
        },
        error: err => {
          this.errorSvc.error(err);
        }
      });
    }
  }





  clienteElegido: any;
  crearActualizarCliente() {
    if (this.formCrearActualizarCliente.invalid) {
      this.submitedFormCrearActualizarCliente = true;
      return;
    }
    this.spinnerSvc.showSpinnerBg("Gestionando usuario perfil");
    var id = -1;
    if (this.clienteElegido != undefined) {
      id = this.clienteElegido!.id;
    }
    var nombres = this.nombres?.value;
    var apellidos = this.apellidos?.value;
    var correo = this.correo?.value;
    var pais = this.pais?.value;
    var telefono = this.telefono?.value;
    var campana = this.campana?.value;
    var status = this.status?.value.nombre;
    var retencion = this.retencion?.value;
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("id", id.toString());
    this.bodyHttp.formData!.append("nombres", nombres);
    this.bodyHttp.formData?.append("apellido", apellidos);
    this.bodyHttp.formData?.append("correo", correo);
    this.bodyHttp.formData?.append("pais", pais);
    this.bodyHttp.formData?.append("telefono", telefono);
    this.bodyHttp.formData?.append("campana", campana);
    this.bodyHttp.formData?.append("estatus", status.toString());
    this.bodyHttp.formData?.append("retencion", retencion.toString());
    if (id == -1) {
      this.crudSvc.postGeneric("crear-cliente", this.bodyHttp.formData).subscribe({
        next: response => {
          this.toastNotSvc.activateToastNotification("success", response.message);
          this.spinnerSvc.closeSpinnerBg();
          this.clienteElegido = undefined;
          this.formCrearActualizarCliente.reset();
          this.retencion?.setValue(false);
          this.clientes = [];
          this.cargarClientesEnCiclo(5000, 1);
        },
        error: err => {
          this.errorSvc.error(err);
        }
      });
    } else {
      this.crudSvc.postGeneric("actualizar-cliente", this.bodyHttp.formData).subscribe({
        next: response => {
          this.toastNotSvc.activateToastNotification("success", response.message);
          this.spinnerSvc.closeSpinnerBg();
          this.clienteElegido = undefined;
          this.formCrearActualizarCliente.reset();
          this.retencion?.setValue(false);
          this.clientes = [];
          this.cargarClientesEnCiclo(5000, 1);
        },
        error: err => {
          this.errorSvc.error(err);
        }
      });
    }

  }

  nuevoCliente() {
    this.limpiarFormularioCliente();
    this.visibleModalNuevoCliente = true
  }

  nuevoAsesor() {
    this.limpiarFormularioAsesor();
    this.visibleModalNuevoUsuario = true;
  }


  visibleModalLlamadasAsesor = false;
  cargoLlamadasAsesor = false;
  colsLlamadasAsesor: any[] | undefined;
  llamadasAsesor: any[] | undefined;


  verDetallesDeEsteAsesor(object: any) {
    console.log(object);
    if(object && object.llamadas && object.llamadas.length > 0){
      console.log(object.llamadas);
      object.llamadas.forEach((element: any) => {
        if (element != undefined && element!.fecha_llamada != undefined  ) {
          element!.fechaLlamada =  new Date(element!.fecha_llamada); 
        } else {
          element!.fechaLlamada = undefined;
        }
      });
      this.visibleModalLlamadasAsesor = true;
      this.cargoLlamadasAsesor = true;
      this.initColsLlamadasAsesor();
      this.llamadasAsesor =  object.llamadas;
    } else {
      this.toastNotSvc.activateToastNotification("warning","El asesor no tiene llamadas asociadas");
    }
  }

  verDetallesDeEsteCliente(object: any) {
    console.log(object);
    if(object && object.llamadas && object.llamadas.length > 0){
      this.llamadas = [];
      console.log(object.llamadas);
      object.llamadas.forEach((element: any) => {
        if (element != undefined && element!.fecha_llamada != undefined  ) {
          element!.fechaLlamada =  new Date(element!.fecha_llamada); 
        } else {
          element!.fechaLlamada = undefined;
        }
      });
      this.cargoLlamadas = true;
      this.llamadas =  object.llamadas;
      this.initColsLlamadas();
      this.visibleModalLlamadas = true;
    } else {
      this.toastNotSvc.activateToastNotification("warning","El cliente no tiene llamadas asociadas");
    }
  }

  eliminarEstaLlamada(object: any) {
    

    console.log(object);
    this.spinnerSvc.showSpinnerBg("Eliminando llamada");
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("id", object.id);
    this.crudSvc.postGeneric("eliminar-llamada", this.bodyHttp.formData).subscribe({
      next: response => {
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.spinnerSvc.closeSpinnerBg();
        this.llamadas = [];
        response.data.forEach((element: any) => {
          if (element != undefined && element!.fecha_llamada != undefined  ) {
            element!.fechaLlamada =  new Date(element!.fecha_llamada); 
          } else {
            element!.fechaLlamada = undefined;
          }
        });
        this.llamadas = response.data;
      
        
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }

  eliminarEstaLlamadaDeAsesor(object: any) {
    console.log(object);
    this.spinnerSvc.showSpinnerBg("Eliminando llamada");
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("id", object.id);
    this.crudSvc.postGeneric("eliminar-llamada-asesor", this.bodyHttp.formData).subscribe({
      next: response => {
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.spinnerSvc.closeSpinnerBg();
        this.llamadasAsesor = [];
        this.llamadasAsesor = response.data;
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }

  editarEsteCliente(object: any) {
    console.log(object);
    this.clienteElegido = object;
    this.nombres?.setValue(this.clienteElegido.nombres);
    this.apellidos?.setValue(this.clienteElegido.apellido);
    this.tiposEstatus!.forEach(element => {
      if (element.nombre == this.clienteElegido.estatus) {
        this.status?.setValue(element);
      }
    });
    this.correo?.setValue(this.clienteElegido.correo);
    this.pais?.setValue(this.clienteElegido.pais);
    this.telefono?.setValue(this.clienteElegido.telefono);
    this.campana?.setValue(this.clienteElegido.campana);
    this.retencion?.setValue(this.clienteElegido.retencion);
    this.visibleModalNuevoCliente = true;
  }

  editarEsteAsesor(object: any) {
    this.password = "";
    this.usuarioElegido = object;
    this.nombresUsuario?.setValue(this.usuarioElegido.nombres);
    this.apellidosUsuario?.setValue(this.usuarioElegido.apellidos);
    this.emailUsuario?.setValue(this.usuarioElegido.email);
    this.telefono_celularUsuario?.setValue(this.usuarioElegido.telefono_celular);
    this.telefono_whatsappUsuario?.setValue(this.usuarioElegido.telefono_whatsapp);
    this.tiposDocumentos.forEach(element => {
      if (element.nombre == this.usuarioElegido.tipo_documento) {
        this.tipo_documentoUsuario?.setValue(element);
      }
    });
    this.documentoUsuario?.setValue(this.usuarioElegido.documento);
    this.bloqueoUsuario?.setValue(this.usuarioElegido.bloqueo);
    this.visibleModalNuevoUsuario = true;
  }

  eliminarMultiplesAsesores(){
    if (this.asesoresSeleccionados!.length === 0) {
      this.toastNotSvc.activateToastNotification("warning", "No hay asesores seleccionados para eliminar.");
      return
    }
    this.spinnerSvc.showSpinnerBg("Estamos eliminando la selección de asesores...")
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("usuarios_a_eliminar", JSON.stringify(this.asesoresSeleccionados));
    this.crudSvc.postGeneric("eliminar-asesores", this.bodyHttp.formData).subscribe({
      next: response => {
        this.spinnerSvc.closeSpinnerBg();
        this.visibleModalGestionSeleccionAsesores = false;
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.usuarios = [];
        this.asesoresSeleccionados = [];
        this.cargarUsuariosEnCiclo(5000, 1);
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }

 

  eliminarMultiplesClientes() {
    if (this.clientesSeleccionados!.length === 0) {
      this.toastNotSvc.activateToastNotification("warning", "No hay clientes seleccionados para eliminar.");
      return
    }
    this.spinnerSvc.showSpinnerBg("Estamos eliminando la selección de clientes...")

    this.bodyHttp.create();
    this.bodyHttp.formData!.append("clientes_a_eliminar", JSON.stringify(this.clientesSeleccionados));
    this.crudSvc.postGeneric("eliminar-clientes", this.bodyHttp.formData).subscribe({
      next: response => {
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.spinnerSvc.closeSpinnerBg();
        this.clientes = [];
        this.clientesSeleccionados = [];
        this.cargarClientesEnCiclo(5000, 1);
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }

  importarExcelDeClientes(object: any) {
    if (object.length === 0) {
      this.toastNotSvc.activateToastNotification("warning", "El archivo de Excel está vacío. Por favor, asegúrese de que contenga datos.");
      return
    }
    this.spinnerSvc.showSpinnerBg("Estamos importando y validando tu lista de clientes, esto puede tardar unos minutos...")
    var errores: string[] = [] //Almacena el listado de errores que se presentaran 
    var i = 2; //Contador de lineas del archivo de excel
    var listaAImportar: Cliente[] = [] //lista que se va a mandar a la base de datos
    /** Recorro las lineas u objetos del excel */
    object.forEach((element: { NOMBRES: string; APELLIDOS: string; CORREO: string; TELEFONO: string; CAMPANA: string; PAIS: string; ESTATUS: string; }) => {
      //Creo una variable que guardara el objeto sin cambios en caso de que ya exista
      var objetoPrimario;
      objetoPrimario = undefined;
      //Creo un objeto de la lista de precios para llenarlo con los datos del excel
      let obtetoAImportar = {} as Cliente;
      obtetoAImportar.nombres = "";
      obtetoAImportar.apellido = "";
      obtetoAImportar.correo = "";
      obtetoAImportar.pais = "";
      obtetoAImportar.telefono = "";
      obtetoAImportar.campana = "";
      obtetoAImportar.status = "NEW";
      //Valido los campos del objeto del excel que corresponden a los campos de la lista de precios
      if ("NOMBRES" in element) {
        if (element.NOMBRES.length == 0) {
          errores.push("Falta el nombre en la linea " + (i));
        } else if (element.NOMBRES.length > 400) {
          errores.push("El nombre no puede superar 400 caracteres en la linea " + (i));
        } else {
          obtetoAImportar.nombres = element.NOMBRES;
        }
      } else {
        errores.push("Falta el nombres en la linea " + (i));
      }
      if ("APELLIDOS" in element) {
        if (element.APELLIDOS.length > 400) {
          errores.push("El apellido no puede superar 400 caracteres en la linea " + (i));
        } else {
          obtetoAImportar.apellido = element.APELLIDOS;
        }
      }
      if ("CORREO" in element) {
        if (element.CORREO.length == 0) {
          errores.push("Falta el correo en la linea " + (i));
        } else if (element.CORREO.length > 400) {
          errores.push("El correo no puede superar 400 caracteres en la linea " + (i));
        } else {
          if (this.isEmail.test(element.CORREO) == false) {
            errores.push("El correo no tiene el formato requerido en la linea " + (i));
          } else {
            obtetoAImportar.correo = element.CORREO;
          }

        }
      } else {
        errores.push("Falta el correo en la linea " + (i));
      }
      if ("TELEFONO" in element) {
        if (element.TELEFONO.length == 0) {
          errores.push("Falta el telefono en la linea " + (i));
        } else if (element.TELEFONO.length > 400) {
          errores.push("El telefono no puede superar 400 caracteres en la linea " + (i));
        } else {
          obtetoAImportar.telefono = element.TELEFONO;
        }
      } else {
        errores.push("Falta el telefono en la linea " + (i));
      }
      if ("CAMPANA" in element) {
        if (element.CAMPANA.length == 0) {
          errores.push("Falta la campaña en la linea " + (i));
        } else if (element.CAMPANA.length > 400) {
          errores.push("La campaña no puede superar 400 caracteres en la linea " + (i));
        } else {
          obtetoAImportar.campana = element.CAMPANA;
        }
      } else {
        errores.push("Falta la campaña en la linea " + (i));
      }
      if ("PAIS" in element) {
        if (element.PAIS.length == 0) {
          errores.push("Falta el pais en la linea " + (i));
        } else if (element.PAIS.length > 400) {
          errores.push("El pais no puede superar 400 caracteres en la linea " + (i));
        } else {
          obtetoAImportar.pais = element.PAIS;
        }
      } else {
        errores.push("Falta el pais en la linea " + (i));
      }

      //Almaceno el objeto en la lista de objetos a importar
      listaAImportar.push(obtetoAImportar);
      i++;
    });
    if (errores.length > 0) {
      this.spinnerSvc.closeSpinnerBg();
      this.fileMang.createTxtOfAArray(errores, "Gestión de errores lista de clientes");
      this.toastNotSvc.activateToastNotification("danger", "El archivo a importar debe corregirse, se descargar un documento que ilustrara los errores");
      return;
    }
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("clientes_a_importar", JSON.stringify(listaAImportar));
    this.crudSvc.postGeneric("importar-clientes", this.bodyHttp.formData).subscribe({
      next: response => {
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.spinnerSvc.closeSpinnerBg();
        this.clientes = [];
        this.cargarClientesEnCiclo(5000, 1);
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }


  initColsLlamadas() {
    this.colsLlamadas = [
      { header: 'Fecha', field: 'fechaLlamada', type: this.accesConstSvc.typeField.date, min_width: 70, max_width: 70 },
      { header: 'Asesor', field: 'nombre_usuario', type: this.accesConstSvc.typeField.text, min_width: 70, max_width: 70 },
      { header: 'Observaciones', field: 'observaciones', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
    ];
  }


  initColsLlamadasAsesor() {
    this.colsLlamadasAsesor = [
      { header: 'Fecha', field: 'fechaLlamada', type: this.accesConstSvc.typeField.date, min_width: 70, max_width: 70 },
      { header: 'Cliente', field: 'nombre_cliente', type: this.accesConstSvc.typeField.text, min_width: 70, max_width: 70 },
      { header: 'Observaciones', field: 'observaciones', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
    ];
  }


  initColsClientes() {
    this.colsClientes = [
      { header: 'Id', field: 'id', type: this.accesConstSvc.typeField.number, min_width: 70, max_width: 70 },
      { header: 'Creado', field: 'created', type: this.accesConstSvc.typeField.date, min_width: 70, max_width: 70 },
      { header: 'Nombres', field: 'nombres', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Apellidos', field: 'apellido', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Asesor', field: 'asesor', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Status', field: 'estatus', type: "list-status", representative: this.tiposEstatus, option_label: "nombre", option_status: "status", min_width: 150, max_width: 150 },
      { header: 'Ult llamada', field: 'ultimaLlamada', type: this.accesConstSvc.typeField.date, min_width: 70, max_width: 70 },
      { header: 'Campaña', field: 'campana', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Retención', field: 'retencion', type: this.accesConstSvc.typeField.boolean, min_width: 150, max_width: 150 },
      { header: 'Correo', field: 'correo', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Telefono', field: 'telefono', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Pais', field: 'pais', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
    ];
  }


  initColsUsuarios() {
    this.colsUsuarios = [
      { header: 'Id', field: 'id', type: this.accesConstSvc.typeField.number, min_width: 150, max_width: 150 },
      { header: 'Nombres', field: 'nombres', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Apellidos', field: 'apellidos', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: '# Clientes', field: 'clientes_count', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Correo', field: 'email', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Telefono', field: 'telefono_celular', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Whatsapp', field: 'telefono_whatsapp', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Bloqueo', field: 'bloqueo', type: this.accesConstSvc.typeField.boolean, min_width: 150, max_width: 150 },
    ];
  }


  initColsUsuariosParaAsignacion() {
    this.colsUsuariosParaAsignacion = [
      { header: 'Nombres', field: 'nombres', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: 'Apellidos', field: 'apellidos', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
      { header: '# Clientes', field: 'clientes_count', type: this.accesConstSvc.typeField.text, min_width: 150, max_width: 150 },
    ];
  }


  asignarAEsteAsesor(object: any) {
    if (!(this.clientesSeleccionados && this.clientesSeleccionados.length > 0)) {
      this.toastNotSvc.activateToastNotification("warning", "Debe elegir los clientes que desea asignarle a este asesor");
      return;
    }
    this.spinnerSvc.showSpinnerBg("Ejecutando asignacion, este proceso puede tardar unos minutos");
    this.bodyHttp.create();
    this.bodyHttp.formData!.append("id", object.id);
    this.bodyHttp.formData!.append("clientes_a_importar", JSON.stringify(this.clientesSeleccionados));
    this.crudSvc.postGeneric("asignar-estos-clientes-a-este-usuario", this.bodyHttp.formData).subscribe({
      next: response => {
        this.spinnerSvc.closeSpinnerBg();
        this.toastNotSvc.activateToastNotification("success", response.message);
        this.visibleModalGestionSeleccionCliente = false;
        console.log(response);
        this.usuarios = [];
        this.clientes = [];
        this.clientesSeleccionados = [];
        this.cargarClientesEnCiclo(5000, 1);
        this.cargarUsuariosEnCiclo(5000, 1);
        this.formAsignarClientes.reset();
      },
      error: err => {
        this.errorSvc.error(err);
      }
    });
  }






  goToLogout() {
    this.authSvc.closeSession('close-sesion');
  }

  sinAccion() { }


}
