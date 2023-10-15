import { Component, OnInit } from '@angular/core';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Ejemplo } from 'src/app/models/ejemplo.model';
import { Pais } from 'src/app/models/pais.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { EjemploService } from 'src/app/services/ejemplo.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent {

  lstPais: Pais[] = [];
  lstDataCatalogo: DataCatalogo[] = [];
  proveedor: Proveedor = {
    razonsocial: "",
    ruc: "",
    direccion: "",
    celular: "",
    contacto: "",
    pais: {
      idPais: -1
    },
    tipoProveedor: {
      idDataCatalogo: -1
    }
  }
  objUsuario: Usuario = {};

  constructor(private proveedorService: ProveedorService, private utilService: UtilService, private tokenService: TokenService) {
    utilService.listaPais().subscribe(
      x => this.lstPais = x
    )
    utilService.listaTipoProveedor().subscribe(
      x => this.lstDataCatalogo = x
    )
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  registra() {
    this.proveedor.usuarioActualiza = this.objUsuario;
    this.proveedor.usuarioRegistro = this.objUsuario;
    this.proveedorService.registrar(this.proveedor).subscribe(
      x => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        });
        this.reiniciarForm();
      },
    );
  }

  reiniciarForm() {
    this.proveedor = {
      razonsocial: "",
      ruc: "",
      direccion: "",
      celular: "",
      contacto: "",
      pais: {
        idPais: -1
      },
      tipoProveedor: {
        idDataCatalogo: -1
      }
    }

  }


}
