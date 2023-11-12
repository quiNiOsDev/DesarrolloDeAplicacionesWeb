import { Component, OnInit } from '@angular/core';
import { Editorial } from '../../models/editorial.model';
import { EditorialService } from '../../services/editorial.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-crud-editorial',
  templateUrl: './crud-editorial.component.html',
  styleUrls: ['./crud-editorial.component.css']
})
export class CrudEditorialComponent implements OnInit {
  listaEditoriales: Editorial[] = [];

  constructor(private router: Router, private editorialService: EditorialService) {}

  ngOnInit() {
    this.loadLazing();
  }

  refresh() {
    this.loadLazing();
  }

  loadLazing() {
    this.editorialService.listar().subscribe(
      (editoriales: Editorial[]) => {
        this.listaEditoriales = editoriales;
      },
      (error) => {
        console.error('Error al cargar la lista de editoriales:', error);
      }
    );
  }

  nuevaEditorial() {
    this.router.navigate(['/agregarEditorial']);
  }

  editarEditorial(editorial: Editorial) {
    this.router.navigate(['/editarEditorial', editorial.idEditorial]);
  }

  eliminarEditorial(id: number) {
    Swal.fire({
      title: '¿Está seguro de eliminar esta editorial?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        // Usuario ha confirmado la eliminación
        this.editorialService.eliminar(id).subscribe(
          (response: any) => {
            // Manejar la respuesta después de la eliminación
            console.log('Editorial eliminada:', response);
            // Llama a la función refresh para actualizar la lista
            this.refresh();
          },
          (error) => {
            console.error('Error al eliminar editorial:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Usuario ha cancelado la eliminación
        // Puedes mostrar un mensaje de cancelación si lo deseas
        Swal.fire('Cancelado', 'La editorial no ha sido eliminada', 'info');
      }
    });
  }
}
