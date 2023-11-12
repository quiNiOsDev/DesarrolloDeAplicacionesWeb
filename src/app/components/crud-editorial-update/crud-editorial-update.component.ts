import {Component, OnInit} from '@angular/core';
import {Editorial} from '../../models/editorial.model';
import {EditorialService} from '../../services/editorial.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {Pais} from '../../models/pais.model';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-crud-editorial-update',
  templateUrl: './crud-editorial-update.component.html',
  styleUrls: ['./crud-editorial-update.component.css']
})
export class CrudEditorialUpdateComponent implements OnInit {
  editorial: Editorial = {
    razonSocial: '',
    direccion: '',
    ruc: '',
    pais: {
      idPais: -1
    },
    fechaActualizacion: new Date()
  };
  listaPaises: Pais[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editorialService: EditorialService,
    private utilService: UtilService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        // Cargar los datos de la editorial
        this.editorialService.obtener(id).subscribe(
          (editorial: Editorial) => {
            this.editorial = editorial;
          }
        );
      }
    });

    this.utilService.listaPais().subscribe(
      (paises: Pais[]) => {
        this.listaPaises = paises;
      }
    );
  }

  editarEditorial() {
    // Validaciones
    if (!this.validateRuc() || !this.validateRazonSocial()) {
      return;
    }

    if (this.editorial.idEditorial !== undefined) {
      this.editorialService.editar(this.editorial.idEditorial, this.editorial).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Cambios Guardados',
            text: 'Los cambios han sido guardados con éxito.',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/verCrudEditorial']);
            }
          });
        },
        (error) => {
          console.error('Error al editar editorial:', error);

          if (error.status === 400) {
            console.log('Error completo:', error);

            if (error.error && error.error.mensaje) {
              if (error.error.mensaje.includes('razonSocial')) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'La Razón Social ya existe. Por favor, ingrese una Razón Social única.',
                });
              } else if (error.error.mensaje.includes('ruc')) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'El RUC ya existe. Por favor, ingrese un RUC único.',
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.error.mensaje,
                });
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al guardar los cambios.',
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error en el servidor. Por favor, inténtalo de nuevo más tarde.',
            });
          }
        }
      );
    } else {
      console.error('ID de editorial no válido');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID de editorial no válido.',
      });
    }
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
