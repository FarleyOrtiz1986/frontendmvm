export const environment = {
    production: true,

      // urlApi: "http://127.0.0.1:8000/api/",
      // url_images_api: "http://127.0.0.1:8000/imagesfp/",
      // urlPage: "http://localhost:4200/registrarse/",
  
      urlApi: "https://charginbullsas.com/api/public/api/",
      url_images_api: "https://charginbullsas.com/api/storage/app/imagesfp/",
      urlPage: "https://chatf-dashboard.web.app/registrarse/",
  
    urlImgLocal: "assets/img/",
    titleApp: "MVM CRM",
    routeLogin: "/home",
    routeNotLogin: "/",


tipos_etiquetas: [
  { "id": "1", "nombre": "success",  "etiqueta": "success"  },
  { "id": "2", "nombre": "warning",  "etiqueta": "warning" },
  { "id": "3", "nombre": "info",  "etiqueta": "info" },
  // { "id": "4", "nombre": "primary",  "etiqueta": "primary"  },
  // { "id": "5", "nombre": "secondary",  "etiqueta": "secondary" },
  // { "id": "6", "nombre": "help",  "etiqueta": "dark" },
  { "id": "4", "nombre": "danger",  "etiqueta": "danger" },
],


  /**Pagina de precios*/
  tipos_documentos: [
    { "id": "1", "nombre": "Cedula",  "descripcion": ""  },
    { "id": "2", "nombre": "Pasaporte",  "descripcion": "" },
    { "id": "3", "nombre": "Tarjeta de residencia",  "descripcion": "" },
  ],

     /**Pagina de precios*/
  status: [
    { "id": "1", "nombre": "1 LLAMADA", "status": "danger",   "descripcion": ""  },
    { "id": "2", "nombre": "2 LLAMADA", "status": "danger",  "descripcion": "" },
    { "id": "3", "nombre": "3 LLAMADA",  "status": "danger", "descripcion": "" },
    { "id": "4", "nombre": "BZD", "status": "danger",  "descripcion": "" },
    { "id": "5", "nombre": "BZD RT",  "status": "danger",  "descripcion": "" },

    { "id": "6", "nombre": "CONTESTA Y CUELGA",  "status": "success",  "descripcion": ""  },
    { "id": "7", "nombre": "CONTESTA Y CUELGA RT", "status": "success",  "descripcion": "" },
    { "id": "8", "nombre": "CUELGA",  "status": "success",  "descripcion": "" },
    { "id": "9", "nombre": "CUELGA RT", "status": "success",  "descripcion": "" },
    { "id": "10", "nombre": "DEPOSITO",  "status": "success",  "descripcion": "" },

    { "id": "11", "nombre": "GAME OVER", "status": "info",  "descripcion": ""  },
    { "id": "12", "nombre": "NEW", "status": "warning",  "descripcion": "" },
    { "id": "13", "nombre": "NO CONTESTA", "status": "info",   "descripcion": "" },
    { "id": "14", "nombre": "NO CONTESTA RT", "status": "info",   "descripcion": "" },
    { "id": "15", "nombre": "NO DINERO", "status": "info",   "descripcion": "" },

    { "id": "16", "nombre": "NO DINERO RT", "status": "warning",   "descripcion": ""  },
    { "id": "17", "nombre": "NO ENLAZA RT", "status": "warning",   "descripcion": "" },
    { "id": "18", "nombre": "NO GESTION", "status": "warning",  "descripcion": "" },
    { "id": "19", "nombre": "NO GESTION RT", "status": "warning",  "descripcion": "" },
    { "id": "20", "nombre": "NO INTERESADO", "status": "warning",  "descripcion": "" },

    { "id": "21", "nombre": "NO INTERESADO RT", "status": "warning",   "descripcion": ""  },
    { "id": "22", "nombre": "NUMERO EQUIVOCADO", "status": "warning",   "descripcion": "" },
    { "id": "23", "nombre": "NUMERO EQUIVOCADO RT", "status": "warning",   "descripcion": "" },
    { "id": "24", "nombre": "OTROS", "status": "warning",  "descripcion": "" },
    { "id": "25", "nombre": "PAGO RT","status": "warning",   "descripcion": "" },

    { "id": "26", "nombre": "POTENCIAL", "status": "warning",  "descripcion": ""  },
    { "id": "27", "nombre": "POTENCIAL RT","status": "warning",   "descripcion": "" },
    { "id": "28", "nombre": "RECUPERACION","status": "warning",   "descripcion": "" },
    { "id": "29", "nombre": "RETIROS", "status": "warning",  "descripcion": "" },
    { "id": "30", "nombre": "SEGUIMIENTO", "status": "warning",  "descripcion": "" },

    { "id": "31", "nombre": "SEGUIMIENTO RT", "status": "warning",  "descripcion": "" },
    { "id": "32", "nombre": "VOLVER A LLAMAR","status": "warning",   "descripcion": "" }
  ],

}