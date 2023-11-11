import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { Pais } from 'src/app/models/pais.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-proveedor-update',
  templateUrl: './crud-proveedor-update.component.html',
  styleUrls: ['./crud-proveedor-update.component.css']
})
export class CrudProveedorUpdateComponent {
  lstPais: Pais[] = [];
  lstDataCatalogo: DataCatalogo[] = [];
  proveedor: Proveedor = {
    idProveedor: -1,
    razonsocial: '',
    ruc: '',
    direccion: '',
    celular: '',
    contacto: '',
    estado: -1,
    pais: {
      idPais: -1,
    },
    tipoProveedor: {
      idDataCatalogo: -1,
    },
    fechaRegistro:new Date()
  };
  objUsuario: Usuario = {};

  fgProveedor = this.formBuilder.group({
    idProveedor: [0],
    razonsocial: ['', [Validators.required, Validators.pattern('[0-9a-zA-Zá-úÁ-ÚñÑ]{1,60}')]], 
    ruc: ['', [Validators.required, Validators.pattern('[0-9]{11}')] ], 
    direccion: ['', Validators.pattern('[0-9a-zA-Zá-úÁ-ÚñÑ]{1,100}')], 
    celular: ['', Validators.pattern('[0-9]{9}')],
    contacto: ['',  Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ]{1,30}')],
    estado: [0],
    pais:  new FormGroup({
      idPais: new FormControl(0, [Validators.required ,Validators.min(1)])
    }), 
    tipoProveedor: new FormGroup({
      idDataCatalogo: new FormControl(0, [Validators.required ,Validators.min(1)])
    }), 
    usuarioRegistro: new FormGroup({
      idUsuario: new FormControl()
    }), 
    usuarioActualiza: new FormGroup({
      idUsuario: new FormControl()
    }),
    fechaRegistro: new FormControl()
});

  constructor(
    private proveedorService: ProveedorService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder : FormBuilder,
    private dialogRef: MatDialogRef<CrudProveedorUpdateComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    utilService.listaPais().subscribe((x) => (this.lstPais = x));
    utilService
      .listaTipoProveedor()
      .subscribe((x) => (this.lstDataCatalogo = x));
    this.objUsuario.idUsuario = tokenService.getUserId();
    this.fgProveedor.patchValue(data);
    
  }

  actualiza() {
    this.fgProveedor.get('usuarioActualiza')?.get('idUsuario')?.setValue(this.objUsuario!.idUsuario!);

    this.proveedor = <any>this.fgProveedor.getRawValue();
    this.proveedorService.actualizar(this.proveedor).subscribe((x) => {
      Swal.fire({
        icon: 'info',
        title: 'Resultado de la actualización',
        text: x.mensaje,
      });
      this.reiniciarForm();
      this.dialogRef.close();
      this.recuperarList();
    });
  }

  reiniciarForm() {
    this.fgProveedor.reset();
    this.fgProveedor.get('usuarioRegistro')?.get('idUsuario')?.setValue(0);
    this.fgProveedor.get('usuarioActualiza')?.get('idUsuario')?.setValue(0)
  }

  recuperarList(){
    this.proveedorService.listar("todos").subscribe(
      x => {
        this.proveedorService.saveObs(x);
      }
    );
  }
}
