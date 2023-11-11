import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common'; // Importa DatePipe

import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { AgregarAlumnoComponent } from './components/agregar-alumno/agregar-alumno.component';
import { AgregarLibroComponent } from './components/agregar-libro/agregar-libro.component';
import { AgregarTesisComponent } from './components/agregar-tesis/agregar-tesis.component';
import { AgregarAutorComponent } from './components/agregar-autor/agregar-autor.component';
import { AgregarSalaComponent } from './components/agregar-sala/agregar-sala.component';
import { AgregarEjemploComponent } from './components/agregar-ejemplo/agregar-ejemplo.component';
import { ConsultaAlumnoComponent } from './components/consulta-alumno/consulta-alumno.component';
import { ConsultaLibroComponent } from './components/consulta-libro/consulta-libro.component';
import { ConsultaTesisComponent } from './components/consulta-tesis/consulta-tesis.component';
import { ConsultaAutorComponent } from './components/consulta-autor/consulta-autor.component';
import { ConsultaSalaComponent } from './components/consulta-sala/consulta-sala.component';
import { CrudAlumnoComponent } from './components/crud-alumno/crud-alumno.component';
import { CrudLibroComponent } from './components/crud-libro/crud-libro.component';
import { CrudTesisComponent } from './components/crud-tesis/crud-tesis.component';
import { CrudAutorComponent } from './components/crud-autor/crud-autor.component';
import { CrudSalaComponent } from './components/crud-sala/crud-sala.component';
import { AgregarProveedorComponent } from './components/agregar-proveedor/agregar-proveedor.component';
import { ConsultaProveedorComponent } from './components/consulta-proveedor/consulta-proveedor.component';
import { CrudProveedorComponent } from './components/crud-proveedor/crud-proveedor.component';
import { ProdInterceptorService } from './interceptors/prod-interceptor.service';
import { AgregarEditorialComponent } from './components/agregar-editorial/agregar-editorial.component';
import { AgregarRevistaComponent } from './components/agregar-revista/agregar-revista.component';
import { ConsultaEditorialComponent } from './components/consulta-editorial/consulta-editorial.component';
import { ConsultaRevistaComponent } from './components/consulta-revista/consulta-revista.component';
import { CrudRevistaComponent } from './components/crud-revista/crud-revista.component';
import { CrudEditorialComponent } from './components/crud-editorial/crud-editorial.component';
import { TransaccionAsignacionLibroComponent } from './components/transaccion-asignacion-libro/transaccion-asignacion-libro.component';
import { TransaccionAsignacionOpcionComponent } from './components/transaccion-asignacion-opcion/transaccion-asignacion-opcion.component';
import { TransaccionAsignacionRolComponent } from './components/transaccion-asignacion-rol/transaccion-asignacion-rol.component';
import { TransaccionDevolucionLibroComponent } from './components/transaccion-devolucion-libro/transaccion-devolucion-libro.component';
import { TransaccionPrestamoLibroComponent } from './components/transaccion-prestamo-libro/transaccion-prestamo-libro.component';
import { TransaccionReporteLibroComponent } from './components/transaccion-reporte-libro/transaccion-reporte-libro.component';
import { TransaccionReservaSalaComponent } from './components/transaccion-reserva-sala/transaccion-reserva-sala.component';
import { TransaccionReporteSalaComponent } from './components/transaccion-reporte-sala/transaccion-reporte-sala.component';

import { CrudAlumnoAddComponent } from './components/crud-alumno-add/crud-alumno-add.component';
import { CrudAlumnoUpdateComponent } from './components/crud-alumno-update/crud-alumno-update.component';
import { CrudLibroAddComponent } from './components/crud-libro-add/crud-libro-add.component';
import { CrudLibroUpdateComponent } from './components/crud-libro-update/crud-libro-update.component';
import { CrudTesisAddComponent } from './components/crud-tesis-add/crud-tesis-add.component';
import { CrudTesisUpdateComponent } from './components/crud-tesis-update/crud-tesis-update.component';
import { CrudAutorAddComponent } from './components/crud-autor-add/crud-autor-add.component';
import { CrudAutorUpdateComponent } from './components/crud-autor-update/crud-autor-update.component';
import { CrudSalaAddComponent } from './components/crud-sala-add/crud-sala-add.component';
import { CrudSalaUpdateComponent } from './components/crud-sala-update/crud-sala-update.component';
import { CrudProveedorAddComponent } from './components/crud-proveedor-add/crud-proveedor-add.component';
import { CrudProveedorUpdateComponent } from './components/crud-proveedor-update/crud-proveedor-update.component';
import { CrudEditorialAddComponent } from './components/crud-editorial-add/crud-editorial-add.component';
import { CrudEditorialUpdateComponent } from './components/crud-editorial-update/crud-editorial-update.component';
import { CrudRevistaUpdateComponent } from './components/crud-revista-update/crud-revista-update.component';
import { CrudRevistaAddComponent } from './components/crud-revista-add/crud-revista-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    IndexComponent,

    AgregarAlumnoComponent,
    AgregarLibroComponent,
    AgregarTesisComponent,
    AgregarAutorComponent,
    AgregarSalaComponent,
    AgregarEditorialComponent,
    AgregarRevistaComponent,
    AgregarProveedorComponent,
    AgregarEjemploComponent,

    ConsultaAlumnoComponent,
    ConsultaLibroComponent,
    ConsultaTesisComponent,
    ConsultaAutorComponent,
    ConsultaSalaComponent,
    ConsultaEditorialComponent,
    ConsultaRevistaComponent,
    ConsultaProveedorComponent,

    CrudAlumnoComponent,
    CrudLibroComponent,
    CrudTesisComponent,
    CrudAutorComponent,
    CrudSalaComponent,
    CrudRevistaComponent,
    CrudEditorialComponent,
    CrudProveedorComponent,
 
    CrudAlumnoAddComponent,
    CrudLibroAddComponent,
    CrudTesisAddComponent,
    CrudAutorAddComponent,
    CrudSalaAddComponent,
    CrudRevistaAddComponent,
    CrudEditorialAddComponent,
    CrudProveedorAddComponent,

    CrudAlumnoUpdateComponent,
    CrudLibroUpdateComponent,
    CrudTesisUpdateComponent,
    CrudAutorUpdateComponent,
    CrudSalaUpdateComponent,
    CrudRevistaUpdateComponent,
    CrudEditorialUpdateComponent,
    CrudProveedorUpdateComponent,

    TransaccionAsignacionLibroComponent,
    TransaccionAsignacionOpcionComponent,
    TransaccionAsignacionRolComponent,
    TransaccionDevolucionLibroComponent,
    TransaccionPrestamoLibroComponent,
    TransaccionReporteLibroComponent,
    TransaccionReporteSalaComponent,
    TransaccionReservaSalaComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    CommonModule,
    MatIconModule
  ],
	providers: [
	  DatePipe,
	  { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
