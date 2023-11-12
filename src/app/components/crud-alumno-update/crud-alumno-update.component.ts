import { Component, Inject, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Pais } from 'src/app/models/pais.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import Swal from 'sweetalert2'
import { UtilService } from 'src/app/services/util.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenService } from 'src/app/security/token.service';
import { Usuario } from 'src/app/models/usuario.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-alumno-update',
  templateUrl: './crud-alumno-update.component.html',
  styleUrls: ['./crud-alumno-update.component.css']
})
export class CrudAlumnoUpdateComponent {

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

  formsActualiza = this.formBuilder.group({
    validaNombres: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]],
    validaApellidos: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]],
    validaTelefono: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    validaDNI: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    validaCorreo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
    validaPais: ['', Validators.min(1)],
    validaModalidad: ['', Validators.min(1)],
    validaFechaNac: ['', [Validators.required]]
  });

  objUsuario: Usuario = {};
  constructor(private alumnoService: AlumnoService, private utilService: UtilService, private tokenService: TokenService, private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.alumno = data;

    utilService.listaPais().subscribe(
      x => this.lstPais = x
    )
    utilService.listaModalidadAlumno().subscribe(
      x => this.lstModalidad = x
    )
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  actualiza() {
    this.alumno.usuarioActualiza = this.objUsuario;
    this.alumnoService.actualiza(this.alumno).subscribe(
      x => Swal.fire('Mensaje', x.mensaje, 'info')
    );
  }
}
