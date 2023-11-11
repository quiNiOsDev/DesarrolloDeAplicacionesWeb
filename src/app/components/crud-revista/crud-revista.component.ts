import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AutorService } from 'src/app/services/autor.service';
import { CrudRevistaAddComponent } from '../crud-revista-add/crud-revista-add.component';
import { Revista } from 'src/app/models/revista.model';
import { CrudRevistaUpdateComponent } from '../crud-revista-update/crud-revista-update.component';
import { RevistaService } from 'src/app/services/revista.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crud-revista',
  templateUrl: './crud-revista.component.html',
  styleUrls: ['./crud-revista.component.css']
})
export class CrudRevistaComponent {
  filtro: string ="";
  pais: string[]=[];
  tipo: string[]=[];
  dataSource:any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  displayedColumns =["idRevista","nombre","frecuencia", "fechaCreacion","pais","tipo","acciones"]; 

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: MatDialog,
    private revistaService:RevistaService,
  ) { }

  openAddDialog() {
    console.log(">>> openAddDialog >>");
    const dialogRef = this.dialogService.open(CrudRevistaAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(">>> result >>"+ result);
      if (result === 1) {
        this.refreshTable();
      }
    })
  }

  openUpdateDialog(obj:Revista){
    console.log(">>> openUpdateDialog  >>");
    const dialogRef = this.dialogService.open(CrudRevistaUpdateComponent, {data:obj});
    dialogRef.afterClosed().subscribe(result => {
        console.log(">>> result >> " + result);
        if (result === 1) {
            this.refreshTable();
        }
    });
  }

  consultaRevista(){
    console.log(">>> consultaRevista >>>"+ this.filtro);
    this.refreshTable();
  }

  elimina(obj:Revista){
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
        this.revistaService.elimina(obj.idRevista || 0).subscribe(
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
    this.revistaService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Revista>(x);
        this.dataSource.paginator = this.paginator; 
      }
    );
  }

}