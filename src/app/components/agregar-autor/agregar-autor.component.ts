import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Autor } from 'src/app/models/autor.model';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { AutorService } from 'src/app/services/autor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-autor',
  templateUrl: './agregar-autor.component.html',
  styleUrls: ['./agregar-autor.component.css']
})
export class AgregarAutorComponent {

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

  constructor(private autorService : AutorService,
     private utilService: UtilService,
      private tokenService: TokenService,
      private formBuilder: FormBuilder){
          utilService.listaPais().subscribe(
            x   =>   this.lstPais=x
          )
          utilService.listaGradoAutor().subscribe(
            x   =>   this.lstGrado=x
          )
    this.objUsuario.idUsuario = tokenService.getUserId();

  }

  registra(){
    console.log('Autor antes de registrar:', this.autor);
    this.autor.usuarioActualiza = this.objUsuario;
    this.autor.usuarioRegistro = this.objUsuario;
    console.log('Autor después de actualizar usuario:', this.autor);
    this.autorService.registrar(this.autor).subscribe(
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
