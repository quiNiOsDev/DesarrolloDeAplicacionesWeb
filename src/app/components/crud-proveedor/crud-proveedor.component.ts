import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { CrudProveedorAddComponent } from '../crud-proveedor-add/crud-proveedor-add.component';
import { CrudProveedorUpdateComponent } from '../crud-proveedor-update/crud-proveedor-update.component';
import { Proveedor } from 'src/app/models/proveedor.model';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

    //Para la Grilla
    filtro: string ="";
 
    //Para el ubigeo
    departamentos: string[] = [];
    provincias: string[] = [];
 
    
    //Grila
   dataSource:any;
 
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
   displayedColumns = ["idProveedor","razonsocial","ruc","tipo","direccion","celular","contacto","pais","estado","acciones"];
 
   constructor(private formBuilder: FormBuilder,  
               private dialogService: MatDialog,
               private proveedorService:ProveedorService) {

              
   }
 
   
   openAddDialog() {
     console.log(">>> openAddDialog  >>");
     const dialogRef = this.dialogService.open(CrudProveedorAddComponent);
     dialogRef.afterClosed().subscribe(result => {
         console.log(">>> result >> " + result);
         if (result === 1) {
             this.refreshTable();
         }
     });
   }
 
   openUpdateDialog(obj:Proveedor){
     console.log(">>> openUpdateDialog  >>");
     
     const dialogRef = this.dialogService.open(CrudProveedorUpdateComponent, {data:obj});
     dialogRef.afterClosed().subscribe(result => {
         console.log(">>> result >> " + result);
         if (result === 1) {
             this.refreshTable();
         }
     });
   }
 
  ngOnInit(): void {}
 
  consultaProveedor(){
       console.log(">>> consultaProveedor >>> " +  this.filtro);
       this.refreshTable();
  }
 
  actualizaEstado(obj:Proveedor){
       obj.estado =   obj.estado == 1 ? 0 : 1; 
       this.proveedorService.actualizar(obj).subscribe();
  }
 
  elimina(obj:Proveedor){
       Swal.fire({
         title: '¿Desea eliminar?',
         text: "Los cambios no se van a revertir",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Sí, elimina',
         cancelButtonText: 'No, cancelar'
       }).then((result) => {
             if (result.isConfirmed) {
                 this.proveedorService.eliminar(obj.idProveedor || 0).subscribe(
                       x => {
                             this.refreshTable();
                             Swal.fire('Mensaje', x.mensaje, 'info');
                       }
                 );
             }
       })   
 }
 
  
 private refreshTable() {
   this.proveedorService.listar(this.filtro==""?"todos":this.filtro).subscribe(
     x => {
       this.dataSource = new MatTableDataSource<Proveedor>(x);
       this.dataSource.paginator = this.paginator; 
     }
   );
 }

}
