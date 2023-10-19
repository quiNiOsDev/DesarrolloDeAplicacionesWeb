import { Component } from '@angular/core';
import { Ejemplo } from 'src/app/models/ejemplo.model';
import { Pais } from 'src/app/models/pais.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { EjemploService } from 'src/app/services/ejemplo.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-ejemplo',
  templateUrl: './agregar-ejemplo.component.html',
  styleUrls: ['./agregar-ejemplo.component.css']
})
export class AgregarEjemploComponent {

  lstPais: Pais[] = [];

  ejemplo: Ejemplo ={
      descripcion: "",
      pais:{
        idPais:-1
      }
  }
  objUsuario: Usuario = {} ;

  constructor(private ejemploService:EjemploService , private utilService: UtilService, private tokenService: TokenService) {
        utilService.listaPais().subscribe(
          x   =>   this.lstPais=x
        )
        this.objUsuario.idUsuario = tokenService.getUserId();
  }

  registra(){
        this.ejemplo.usuarioActualiza = this.objUsuario;
        this.ejemplo.usuarioRegistro = this.objUsuario;
        this.ejemploService.registrar(this.ejemplo).subscribe(
          x=>{
            Swal.fire({
              icon: 'info',
              title: 'Resultado del Registro',
              text: x.mensaje,
            })
          },
        );
  }

}
