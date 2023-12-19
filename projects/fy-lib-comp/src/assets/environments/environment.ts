export const environment = {
  
  
    /**Expresiones regulares para el manejo de validaciones */
    regular_expres_email:
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
    regular_expres_number: /^[0-9]*$/,

    
    regular_expresion_segura_contrasena: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/,
    regular_expresion_telefono_movil : '^3\\d{9}$',
    regular_expresion_telefono: '^[1-9][0-9]{6}$',
    storage_puntos_venta: 'storage_puntos_venta',
  

    
   /** Permite indicar el tipo de campo que va a llevar la tabla */
   type_field: {
    text: 'text', // filtra los datos de texto en función de una cadena de búsqueda
    number: 'numeric', //filtra los datos numéricos en función de un valor numérico
    date: 'date', // filtra los datos de fecha en función de una fecha seleccionada en un calendario
    date_hour: 'date_hour', // filtra los datos de fecha en función de una fecha seleccionada en un calendario y la hora
    time: 'time', // filtra los datos de fecha en función de la hora
    boolean: 'boolean', // filtra los datos booleanos en función de si están marcados o no
    select: 'select', // filtra los datos en un componente select
    percentage : 'percentage', // filtra los datos con el tipo porcentaje
    currency_cop: 'cop', // filtra los datos en función de una opción seleccionada en un menú desplegable
  },
   
  
  

  };
  