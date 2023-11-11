import { Component, OnInit, ViewChild } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Alumno } from 'src/app/models/alumno.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'
import { TokenService } from 'src/app/security/token.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CrudAlumnoAddComponent } from '../crud-alumno-add/crud-alumno-add.component';
import { CrudAlumnoUpdateComponent } from '../crud-alumno-update/crud-alumno-update.component';


@Component({
  selector: 'app-crud-alumno',
  templateUrl: './crud-alumno.component.html',
  styleUrls: ['./crud-alumno.component.css']
})
export class CrudAlumnoComponent implements OnInit {

  //Para la Grilla
  filtro: string = "";
  lstPais: Pais[] = [];
  lstModalidad: DataCatalogo[] = [];
  alumno: Alumno = {
    nombres: "",
    pais: {
      idPais: -1
    },
    modalidad: {
      idDataCatalogo: -1
    }
  }

  //Grila
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  //displayedColumns = ["idAlumno","nombre","dni","fecha","hora","ubigeo","estado",'actions'];
  displayedColumns = ["idAlumno", "nombres","apellidos","dni","telefono","estado","pais","acciones"]

  constructor(private formBuilder: FormBuilder,
    private dialogService: MatDialog,
    private AlumnoService: AlumnoService) {
  }

  openAddDialog() {
    console.log(">>> openAddDialog  >>");
    const dialogRef = this.dialogService.open(CrudAlumnoAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(">>> result >> " + result);
      if (result === 1) {
        this.refreshTable();
      }
    });
  }
  openUpdateDialog(obj: Alumno) {
    console.log(">>> openUpdateDialog  >>");

    const dialogRef = this.dialogService.open(CrudAlumnoUpdateComponent, { data: obj });
    dialogRef.afterClosed().subscribe(result => {
      console.log(">>> result >> " + result);
      if (result === 1) {
        this.refreshTable();
      }
    });
  }
  

  ngOnInit(): void { }

  consultaAlumno() {
    console.log(">>> consultaAlumno >>> " + this.filtro);
    this.refreshTable();
  }
  actualizaEstado(obj: Alumno) {
    obj.estado = obj.estado == 1 ? 0 : 1;
    this.AlumnoService.actualiza(obj).subscribe();
  }
  elimina(obj: Alumno) {
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
        this.AlumnoService.elimina(obj.idAlumno || 0).subscribe(
          x => {
            this.refreshTable();
            Swal.fire('Mensaje', x.mensaje, 'info');
          }
        );
      }
    })
  }

  private refreshTable() {
    this.AlumnoService.consultaPorNombre(this.filtro == "" ? "todos" : this.filtro).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Alumno>(x);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

}
