import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-libro-update',
  templateUrl: './crud-libro-update.component.html',
  styleUrls: ['./crud-libro-update.component.css']
})

export class CrudLibroUpdateComponent implements OnInit {

  libroForm!: FormGroup;
  lstCategorias: DataCatalogo[] = [];
  lstTipos: DataCatalogo[] = [];
  maxYear: number = new Date().getFullYear();
  libro: Libro;

  /*
  libro: Libro = {
    titulo: '',
    anio: 0,
    serie: '',
    categoriaLibro: {
      idDataCatalogo: -1
    },
    tipoLibro: {
      idDataCatalogo: -1
    },
    usuarioRegistro: {
      idUsuario: -1
    },
    usuarioActualiza: {
      idUsuario: -1
    }
  };
*/
  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private dialogRef: MatDialogRef<CrudLibroUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.libro = data;
  }

  ngOnInit() {
    this.libroForm = this.fb.group({
      titulo: [this.libro.titulo, [Validators.required, Validators.minLength(3)]],
      anio: [this.libro.anio, [Validators.required, Validators.min(1900), Validators.max(this.maxYear)]],
      serie: [this.libro.serie, [Validators.required]],
      categoriaLibro: [this.libro.categoriaLibro?.idDataCatalogo || '-1', [Validators.required, Validators.min(1)]],
      tipoLibro: [this.libro.tipoLibro?.idDataCatalogo || '-1', [Validators.required, Validators.min(1)]]
    });
    this.utilService.listaCategoriaDeLibro().subscribe(
      c => this.lstCategorias = c
    );
    this.utilService.listaTipoLibroRevista().subscribe(
      t => this.lstTipos = t
    );
  }
 
  actualiza() {
    this.libro.usuarioActualiza = { idUsuario: this.tokenService.getUserId() };
    //this.libro.usuarioRegistro = { idUsuario: this.tokenService.getUserId() };
    console.log(this.libro);
    this.libroService.actualiza(this.libro).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            icon: 'info',
            title: 'Resultado del Registro',
            text: response.mensaje
          });
          this.dialogRef.close(1);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Resultado del Registro',
            text: 'El registro no pudo completarse.',
          });
        }
      },
      (error) => {
        console.error('Error en el servicio:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el Registro',
          text: 'Ocurrió un error al intentar registrar el libro.',
        });
      }
    );
  }

  cancelar() {
    this.dialogRef.close(0);
  }

  isFormValid(): boolean {
    return this.libroForm.valid;
  }

}
