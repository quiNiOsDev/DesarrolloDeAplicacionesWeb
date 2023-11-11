import { Component, OnInit } from '@angular/core';
import { Editorial } from '../../models/editorial.model';
import { EditorialService } from '../../services/editorial.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Pais } from '../../models/pais.model';
import { UtilService } from '../../services/util.service';

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
    }
  };
  listaPaises: Pais[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editorialService: EditorialService,
    private utilService: UtilService
  ) {}

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
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al guardar los cambios.',
          });
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
}
