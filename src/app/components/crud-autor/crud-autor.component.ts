import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Autor } from 'src/app/models/autor.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AutorService } from 'src/app/services/autor.service';
import Swal from 'sweetalert2';
import { CrudAutorUpdateComponent } from '../crud-autor-update/crud-autor-update.component';
import { CrudAutorAddComponent } from '../crud-autor-add/crud-autor-add.component';

@Component({
  selector: 'app-crud-autor',
  templateUrl: './crud-autor.component.html',
  styleUrls: ['./crud-autor.component.css']
})
export class CrudAutorComponent {

  filtro: string ="";

  pais: string[]=[];
  grado: string[]=[];

  dataSource:any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  displayedColumns =["idAutor","nombres","apellidos", "fechaNacimiento","telefono","pais","grado","acciones"]; 

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: MatDialog,
    private autorService:AutorService,
  ) { }

  openAddDialog() {
    console.log(">>> openAddDialog >>");
    const dialogRef = this.dialogService.open(CrudAutorAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(">>> result >>"+ result);
      if (result === 1) {
        this.refreshTable();
      }
    })
  }

  openUpdateDialog(obj:Autor){
    console.log(">>> openUpdateDialog  >>");
    const dialogRef = this.dialogService.open(CrudAutorUpdateComponent, {data:obj});
    dialogRef.afterClosed().subscribe(result => {
        console.log(">>> result >> " + result);
        if (result === 1) {
            this.refreshTable();
        }
    });
  }

  consultaAutor(){
    console.log(">>> consultaAutor >>>"+ this.filtro);
    this.refreshTable();
  }

  elimina(obj:Autor){
    Swal.fire({
        title: '¿Desea eliminar?',
        text: "Los cambios no se van a revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimina',
        cancelButtonText: 'No, cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        this.autorService.elimina(obj.idAutor || 0).subscribe(
          x => {
            this.refreshTable();
            Swal.fire('Mensaje', x.mensaje, 'info');
          }
        )
      }
    }
    )
  }

  private refreshTable() {
    this.autorService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Autor>(x);
        this.dataSource.paginator = this.paginator; 
      }
    );
  }

}
