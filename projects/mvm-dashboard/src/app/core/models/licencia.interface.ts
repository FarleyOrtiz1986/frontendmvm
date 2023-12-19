export interface Licencia {

    id: number;

    // id del padre
    padre_id: number;
    hijo_id: number;
    mensualidad_id: number;

    fecha_adjunto_comprobante_licencias: Date;
    precio_licencias: number;
    tipo_moneda: string;
    comprobante_pago_licencias: string;
    tipo_de_pago_licencias: string;
    observaciones_de_quien_adjunto_comprobante: string;

    fecha_inicio_activo_licencias: Date;
    fecha_maxima_finalizacion_para_inactivo_licencias: Date;
    observaciones_administracion_licencias: string;

    fecha_actualizacion_estado_licencias: Date;
    estado_operacion_licencias: string;

    numero_licencias_activas_para_venta: number;
    numero_licencias_congeladas_por_vencimiento: number;
    
    // Fecha de moficación y creacion del registro
    updated_at: Date;
    created_at: Date;


}