import {Component} from '@angular/core';
import {Pais} from "../../models/pais.model";
import {Editorial} from "../../models/editorial.model";
import {Usuario} from "../../models/usuario.model";
import {EditorialService} from "../../services/editorial.service";
import {UtilService} from "../../services/util.service";
import {TokenService} from "../../security/token.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crud-editorial-add',
  templateUrl: './crud-editorial-add.component.html',
  styleUrls: ['./crud-editorial-add.component.css']
})
export class CrudEditorialAddComponent {
  lstPais: Pais[] = [];
  editorial: Editorial = {
    razonSocial: "",
    direccion: "",
    ruc: "",
    pais: {
      idPais: -1
    },
    fechaCreacion: new Date()
  };
  objUsuario: Usuario = {};

  constructor(
    private editorialService: EditorialService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private router: Router
  ) {
    utilService.listaPais().subscribe(
      x => this.lstPais = x
    );
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  registra() {
    // Validaciones
    if (!this.validateRuc() || !this.validateRazonSocial()) {
      return;
    }

    this.editorial.usuarioActualiza = this.objUsuario;
    this.editorial.usuarioRegistro = this.objUsuario;
    this.editorialService.registrar(this.editorial).subscribe(
      (response: any) => {
        if (response.mensaje) {
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Los cambios han sido guardados con éxito.',
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/verCrudEditorial']);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en el Registro',
            text: 'No se pudo completar el registro. Por favor, inténtalo de nuevo.',
          });
        }
      },
      (error) => {
        console.error('Error al registrar editorial:', error);

        if (error.status === 400) {
          console.log('Error completo:', error);

          if (error.error && error.error.mensaje) {
            Swal.fire({
              icon: 'error',
              title: 'Error en el Registro',
              text: error.error.mensaje,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error en el Registro',
              text: 'Hubo un error en el servidor. Por favor, inténtalo de nuevo más tarde.',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en el Registro',
            text: 'Hubo un error en el servidor. Por favor, inténtalo de nuevo más tarde.',
          });
        }
      }
    );
  }



  // Validar RUC
  validateRuc(): boolean {
    const rucRegex = /^[0-9]{11}$/;

    if (!this.editorial.ruc || !rucRegex.test(this.editorial.ruc)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El RUC debe contener 11 números.',
      });
      return false;
    }
    return true;
  }

  // Validar Razón Social
  validateRazonSocial(): boolean {
    const razonSocialRegex = /^[a-zA-Z0-9 ]*$/;

    if (!this.editorial.razonSocial || !razonSocialRegex.test(this.editorial.razonSocial)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La Razón Social solo debe contener letras y números, sin caracteres especiales ni tildes.',
      });
      return false;
    }
    return true;
  }
}
