import { DataCatalogo } from "./dataCatalogo.model";
import { Pais } from "./pais.model";
import { Usuario } from "./usuario.model";

export class Proveedor {
    idProveedor?:number;
    razonsocial?:string;
    ruc?:string;
    direccion?:string;
    celular?:string;
    contacto?:string;
    pais?:Pais;
    estado?:number;
    tipoProveedor?:DataCatalogo
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
    fechaRegistro?:Date;
}
