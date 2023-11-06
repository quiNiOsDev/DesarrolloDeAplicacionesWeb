import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Autor } from 'src/app/models/autor.model';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { AutorService } from 'src/app/services/autor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-autor-update',
  templateUrl: './crud-autor-update.component.html',
  styleUrls: ['./crud-autor-update.component.css']
})
export class CrudAutorUpdateComponent {

  lstGrado: DataCatalogo[] =[];
  lstPais: Pais[] = [];

  formsActualiza = this.formBuilder.group({
    validaNombre:['', [Validators.required,Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]],
    validaApellido:['', [Validators.required,Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]],
    validaTelefono: ['', [Validators.required, Validators.pattern('[0-9]{1,9}')]],
    validaFechaNacimiento: ['', [Validators.required]],
    validaPais: ['', Validators.min(1)] , 
    validaGrado: ['', Validators.min(1)] , 

  });
  
  autor: Autor ={
    nombres:"",
    apellidos:"",
    fechaNacimiento:new Date(),
    telefono:"",
    pais :{
      idPais:-1
    },
    grado :{
      idDataCatalogo:-1
    }
  }

  objUsuario: Usuario = {} ;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private autorService: AutorService,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.autor = data;
    this.utilService.listaPais().subscribe(
      x => this.lstPais = x
    )
    this.utilService.listaGradoAutor().subscribe(
      x => this.lstGrado = x
    )
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  actualiza(){
    this.autor.usuarioActualiza = this.objUsuario;

    this.autorService.actualiza(this.autor).subscribe(
        x =>  Swal.fire('Mensaje', x.mensaje, 'info')
    );
}

  
}
