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
  selector: 'app-agregar-revista',
  templateUrl: './agregar-revista.component.html',
  styleUrls: ['./agregar-revista.component.css']
})
export class AgregarRevistaComponent {

  lstTipoRevista: DataCatalogo[] = [];
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

  objUsuario: Usuario ={};

  constructor(
    private revistaService : RevistaService, 
    private utilService: UtilService,
    private tokenService: TokenService,
      private formBuilder: FormBuilder){
      this.utilService.listaPais().subscribe(
      x =>   this.lstPais=x
    )
    this.utilService.listaTipoLibroRevista().subscribe(
      x =>   this.lstTipoRevista=x
    )
    this.objUsuario.idUsuario = tokenService.getUserId();

}

registra(){
  console.log('Revista antes de hacer un registro:', this.revista);
  this.revista.usuarioActualiza = this.objUsuario;
  this.revista.usuarioRegistro = this.objUsuario;
  console.log('Revista después de actualizar usuario:', this.revista);
  this.revistaService.registrar(this.revista).subscribe(
    x => {
      Swal.fire('Mensaje', x.mensaje, 'info');
    }
  );
}


}





   /* (response: any)=>{
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro',
        text: response.mensaje,
      })
    },
  );
  }

}*/
