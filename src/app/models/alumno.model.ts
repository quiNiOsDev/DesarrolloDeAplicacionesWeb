import { Pais } from "./pais.model";
import { DataCatalogo } from "./dataCatalogo.model";
import { Usuario } from "./usuario.model";

export class Alumno {

    idAlumno?: number;
    nombres?:string;
    apellidos?:string;
    telefono?:string;
    dni?:string;
    correo?:string;
    fechaNacimiento?:String;
    
    pais?:Pais;
    modalidad?:DataCatalogo;
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
}

