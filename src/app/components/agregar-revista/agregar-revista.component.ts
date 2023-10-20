import { Component } from '@angular/core';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { Revista } from 'src/app/models/revista.models';
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

  lstTipo: DataCatalogo[] = [];
  lstPais: Pais[] = [];

  revista: Revista ={
    nombre:"",
    frecuencia:"",
    fechaCreacion:new Date(),
    pais :{
      idPais:-1
    },
    tipo :{
      idDataCatalogo:-1
    }
  }

  objUsuario: Usuario ={};

  constructor(private revistaService : RevistaService, private utilService: UtilService, private tokenService: TokenService){
    utilService.listaPais().subscribe(
      x =>   this.lstPais=x
    )
    utilService.listaTipoLibroRevista().subscribe(
      x =>   this.lstTipo=x
    )
this.objUsuario.idUsuario = tokenService.getUserId();

}

registra(){
  console.log('Revista antes de hacer un registro:', this.revista);
  this.revista.usuarioActualiza = this.objUsuario;
  this.revista.usuarioRegistro = this.objUsuario;
  console.log('Revista después de actualizar usuario:', this.revista);
  this.revistaService.registrar(this.revista).subscribe(
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
