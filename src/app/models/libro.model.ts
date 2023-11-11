import { Usuario } from "./usuario.model";
import { DataCatalogo } from "./dataCatalogo.model";

export class Libro {
    idLibro?: number;
    titulo?: string;
    anio?: number;
    serie?: string;
    fechaRegistro?: Date;
    fechaActualizacion?: Date;
    estado?: number;
    categoriaLibro?:DataCatalogo;
    estadoPrestamo?: number;
    tipoLibro?:DataCatalogo;
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
}