import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Alumno } from 'src/app/models/alumno.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'
import { TokenService } from 'src/app/security/token.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { FormBuilder, Validators } from '@angular/forms';


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

  formsRegistra = this.formBuilder.group({
    validaNombres: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]],
    validaApellidos: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]],
    validaTelefono: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    validaDNI: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    validaCorreo:['',[Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
    validaPais: ['', Validators.min(1)],
    validaModalidad: ['', Validators.min(1)],
    validaFechaNac: ['', [Validators.required]]
  });

  constructor(private alumnoService:AlumnoService , private utilService: UtilService, private tokenService: TokenService, private formBuilder: FormBuilder) {
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
