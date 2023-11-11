import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import Swal from 'sweetalert2';
import { CrudLibroAddComponent } from '../crud-libro-add/crud-libro-add.component';
import { CrudLibroUpdateComponent } from '../crud-libro-update/crud-libro-update.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crud-libro',
  templateUrl: './crud-libro.component.html',
  styleUrls: ['./crud-libro.component.css']
})

export class CrudLibroComponent implements OnInit {
  filtro: string = '';
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = [
    'idLibro',
    'titulo',
    'anio',
    'serie',
    'fecharegistro',
    'idCategoriaLibro',
    'idTipoLibro',
    'idEstadoPrestamo',
    'estado',
    'acciones'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: MatDialog,
    private libroService: LibroService,
    private datePipe: DatePipe
  ) {}

  openAddDialog() {
    console.log('>>> openAddDialog  >>');
    const dialogRef = this.dialogService.open(CrudLibroAddComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('>>> result >> ' + result);
      this.refreshTable();
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  ngOnInit(): void {
    this.consultaLibro();
  }

  consultaLibro() {
    console.log('>>> consultaLibro >>> ' + this.filtro);
    this.refreshTable();
  }

  actualizaEstado(obj: Libro) {
    obj.estado = obj.estado == 1 ? 0 : 1;
    this.libroService.actualiza(obj).subscribe();
  }

  elimina(obj: Libro) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: 'Los cambios no se van a revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
          this.libroService.elimina(obj.idLibro || 0).subscribe(
                x => {
                      this.refreshTable();
                      Swal.fire('Mensaje', x.mensaje, 'info');
                }
          );
      }
    })   
  }

  openUpdateDialog(obj: Libro) {
    console.log('>>> openUpdateDialog  >>');
    const libroClonado: Libro = Object.assign({}, obj);
    console.log(obj);

    const dialogRef = this.dialogService.open(CrudLibroUpdateComponent, {
      data: libroClonado,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('>>> result >> ' + result);
      //if (result === 1) {
      //  this.refreshTable();
      //}
      this.refreshTable();
    });
  }
  
  private refreshTable() {
    this.libroService
      .consultaPorNombre(this.filtro == '' ? 'todos' : this.filtro)
      .subscribe((x) => {
        this.dataSource = new MatTableDataSource<Libro>(x);
        this.dataSource.paginator = this.paginator;
      });
  }

}
