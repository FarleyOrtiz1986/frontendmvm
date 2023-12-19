export interface Cliente {
    id: number;
    nombres: string; 
    apellido: string; 
    correo: string; 
    pais: string; 
    telefono: string; 
    campana: string; 
    status: string; 
    // Fecha de moficación y creacion del registro
    updated_at: Date;
    created_at: Date;

}