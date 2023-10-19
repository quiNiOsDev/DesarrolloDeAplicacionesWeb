import { DataCatalogo } from "./dataCatalogo.model";
import { Pais } from "./pais.model";
import { Usuario } from "./usuario.model";

export class Autor {

    idAutor?: number;
    nombres?:string;
    apellidos?:string;
    fechaNacimiento?:Date;
    telefono?:string;
    grado?:DataCatalogo;
    pais?:Pais;
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
}
