import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Pais } from 'src/app/models/pais.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import Swal from 'sweetalert2'
import { UtilService } from 'src/app/services/util.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenService } from 'src/app/security/token.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-crud-alumno-add',
  templateUrl: './crud-alumno-add.component.html',
  styleUrls: ['./crud-alumno-add.component.css']
})
export class CrudAlumnoAddComponent {

  filtro: string = "";
  lstPais: Pais[] = [];
  lstModalidad: DataCatalogo[] = [];
  alumno: Alumno = {
    nombres: "",
    pais: {
      idPais: -1
    },
    modalidad: {
      idDataCatalogo: -1
    }
  }

  //Declaración de Validaciones
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

  objUsuario: Usuario = {};
  constructor(private alumnoService: AlumnoService, private utilService: UtilService, private tokenService: TokenService, private formBuilder: FormBuilder) {
    utilService.listaPais().subscribe(
      x => this.lstPais = x
    )
    utilService.listaModalidadAlumno().subscribe(
      x => this.lstModalidad = x
    )
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  registra() {
    this.alumno.usuarioActualiza = this.objUsuario;
    this.alumno.usuarioRegistro = this.objUsuario;
    this.alumnoService.inserta(this.alumno).subscribe(
      x => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        })
      }
    );
  }
}

