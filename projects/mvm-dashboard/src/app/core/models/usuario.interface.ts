export interface Usuario{
     id: number ;
     padre_id: number;
     url_avatar: string ;
     nombres: string ;
     email: string ;
     apellidos: string ;
     telefono_celular: string ;
     telefono_whatsapp: string ;
     estado: boolean ;
     bloqueo: boolean ;
     updated_at: Date ;
     created_at:Date;
}