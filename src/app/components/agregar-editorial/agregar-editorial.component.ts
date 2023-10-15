import {Component} from '@angular/core';
import {Editorial} from 'src/app/models/editorial.model';
import {Pais} from 'src/app/models/pais.model';
import {Usuario} from 'src/app/models/usuario.model';
import {TokenService} from 'src/app/security/token.service';
import {EditorialService} from 'src/app/services/editorial.service';
import {UtilService} from 'src/app/services/util.service';
import Swal from 'sweetalert2'
import {Ejemplo} from "../../models/ejemplo.model";

@Component({
    selector: 'app-agregar-editorial',
    templateUrl: './agregar-editorial.component.html',
    styleUrls: ['./agregar-editorial.component.css']
})
export class AgregarEditorialComponent {
    lstPais: Pais[] = [];
    editorial: Editorial = {
        razonSocial: "",
        direccion: "",
        ruc: "",
        pais: {
            idPais: -1
        }
    }
    objUsuario: Usuario = {};

    constructor(private editorialService: EditorialService, private utilService: UtilService, private tokenService: TokenService) {
        utilService.listaPais().subscribe(
            x   =>   this.lstPais=x
        )
        this.objUsuario.idUsuario = tokenService.getUserId();
    }

    registra() {
        this.editorial.usuarioActualiza = this.objUsuario;
        this.editorial.usuarioRegistro = this.objUsuario;
        this.editorialService.registrar(this.editorial).subscribe(
            (response: any) => {
                Swal.fire({
                    icon: 'info',
                    title: 'Resultado del Registro',
                    text: response.mensaje,
                });

                if (response.url) {
                    console.log('URL de la editorial registrada:', response.url);
                }
            },
        );
    }
}
