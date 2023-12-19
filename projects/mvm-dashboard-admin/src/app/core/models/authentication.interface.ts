import { User } from "./user.interface";

export interface  Authentication{
    respuesta: boolean;
    mensaje: string;
    token: string;
    user: User;
}


