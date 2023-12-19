export interface Mensualidad {

    id: number;

    // id del padre y del hijo que en este caso es el que paga la mensualidad
    padre_id: number;
    hijo_id: number;

    activacion: string; //Para saber si es acivacion o no
    visible_al_lider: string; // si o no

    //Informacion del pago
    fecha_adjunto_comprobante_mensualidad: Date;
    precio_mensualidad: number;
    tipo_moneda: string;
    comprobante_pago_mensualidad: string;
    tipo_de_pago_mensualidad: string;
    observaciones_de_quien_pago_mensualidad: string;

    //Informacion de la activacion por parte de la administracion
    fecha_inicio_activo_mensualidad: Date;
    fecha_finalizacion_para_inactivo_mensualidad: Date;
    observaciones_administracion_mensualidad: string;

    //El estado manejado por la administracion para las acciones tomadas por la administracion para dicha transaccion
    fecha_actualizacion_estado_mensualidad: Date;
    estado_operacion_mensualidad: string;

    //Informacion del pago de la parte de la mensualidad al padre
    precio_comision_padre_mensualidad: string;
    fecha_pago_comision_padre_mensualidad: string;
    comprobante_pago_padre_mensualidad: string;

    // Fecha de moficación y creacion del registro
    updated_at: Date;
    created_at: Date;

}