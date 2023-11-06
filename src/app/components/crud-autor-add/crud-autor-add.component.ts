import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Autor } from 'src/app/models/autor.model';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { AutorService } from 'src/app/services/autor.service';
import { TokenService } from 'src/app/security/token.service';

@Component({
  selector: 'app-crud-autor-add',
  templateUrl: './crud-autor-add.component.html',
  styleUrls: ['./crud-autor-add.component.css']
})
export class CrudAutorAddComponent {

  lstGrado: DataCatalogo[] =[];
  lstPais: Pais[] = [];

  formsRegistra = this.formBuilder.group({
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
    fechaNacimiento: new Date(),
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
    private utilService: UtilService,
    private formBuilder: FormBuilder,
    private autorService: AutorService,
    private tokenService: TokenService,
  ){
    this.utilService.listaPais().subscribe(
      x => this.lstPais = x
    )
    this.utilService.listaGradoAutor().subscribe(
      x => this.lstGrado = x
    )
    this.objUsuario.idUsuario = tokenService.getUserId();
  }


  registra(){

  this.autor.usuarioActualiza = this.objUsuario;
  this.autor.usuarioRegistro = this.objUsuario;
    this.autorService.registrar(this.autor).subscribe(
          x => {
                Swal.fire('Mensaje', x.mensaje, 'info'); 
          }
    );
}


}
