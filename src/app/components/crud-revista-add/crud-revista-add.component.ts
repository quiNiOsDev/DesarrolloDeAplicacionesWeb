import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { Revista } from 'src/app/models/revista.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { RevistaService } from 'src/app/services/revista.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-revista-add',
  templateUrl: './crud-revista-add.component.html',
  styleUrls: ['./crud-revista-add.component.css']
})
export class CrudRevistaAddComponent {
  lstTipoRevista: DataCatalogo[] =[];
  lstPais: Pais[] = [];

  formsRegistra = this.formBuilder.group({
    validaNombre:['', [Validators.required,Validators.pattern('^[a-zA-Z0-9á-úÁ-ÚñÑ ]{1,100}')]],
    validaFrecuencia:['', [Validators.required,Validators.pattern('^[a-zA-Z0-9á-úÁ-ÚñÑ ]{1,100}')]],
    validaFechaCreacion: ['', [Validators.required]],
    validaPais: ['', Validators.min(1)] , 
    validaTipoRevista: ['', Validators.min(1)] , 

  });

  revista: Revista ={
    nombre:"",
    frecuencia:"",
    fechaCreacion:new Date(),
    pais :{
      idPais:-1
    },
    tipoRevista :{
      idDataCatalogo:-1
    }
  }

  objUsuario: Usuario = {} ;

  constructor(
    private utilService: UtilService,
    private formBuilder: FormBuilder,
    private revistaService: RevistaService,
    private tokenService: TokenService,
  ){
    this.utilService.listaPais().subscribe(
      x => this.lstPais = x
    )
    this.utilService.listaTipoLibroRevista().subscribe(
      x => this.lstTipoRevista = x
    )
    this.objUsuario.idUsuario = tokenService.getUserId();
  }


  registra(){

  this.revista.usuarioActualiza = this.objUsuario;
  this.revista.usuarioRegistro = this.objUsuario;
    this.revistaService.registrar(this.revista).subscribe(
          x => {
                Swal.fire('Mensaje', x.mensaje, 'info'); 
          }
    );
}


}

