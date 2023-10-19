import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Alumno } from 'src/app/models/alumno.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'
import { TokenService } from 'src/app/security/token.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';


@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent  {

  lstPais: Pais[] = [];
  lstDataCatalog: DataCatalogo[] = [];
  alumno: Alumno ={
      nombres: "",
      apellidos: "",
      telefono: "",
      dni: "",
      correo: "",
      fechaNacimiento: "",
      pais:{
        idPais:-1
      },
      modalidad:{
        idDataCatalogo:-1
      }
  }
  objUsuario: Usuario = {} ;

  constructor(private alumnoService:AlumnoService , private utilService: UtilService, private tokenService: TokenService) {
    this.utilService.listaPais().subscribe(
      x   =>   this.lstPais=x
    )
    this.utilService.listaModalidadAlumno().subscribe(
      x   =>   this.lstDataCatalog=x
    )
    
    this.objUsuario.idUsuario = tokenService.getUserId();
}

  registra(){
    this.alumno.usuarioActualiza = this.objUsuario;
    this.alumno.usuarioRegistro = this.objUsuario;
    
    this.alumnoService.registrar(this.alumno).subscribe(
      (response: any) => {
        Swal.fire({
            icon: 'info',
            title: 'Resultado del Registro',
            text: response.mensaje,
        });
      },
    );
}

}
