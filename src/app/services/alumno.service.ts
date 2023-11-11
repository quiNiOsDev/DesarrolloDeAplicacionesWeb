import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';


const baseUrlAlumno = AppSettings.API_ENDPOINT+ '/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http:HttpClient) { }

  registrar(data:Alumno):Observable<any>{
    return this.http.post(baseUrlAlumno, data);
  }

  consultaPorNombre(filtro:string):Observable<Alumno[]>{
    return  this.http.get<Alumno[]>(baseUrlAlumno +"/listaAlumnoPorNombreLike/"+filtro); 
  }  

inserta(obj:Alumno):Observable<any>{
    return this.http.post(baseUrlAlumno +"/registraAlumno", obj);
}

actualiza(obj:Alumno):Observable<any>{
    return this.http.put(baseUrlAlumno + "/actualizaAlumno", obj);
}

elimina(idAlumno:number):Observable<any>{
    return this.http.delete(baseUrlAlumno + "/eliminaAlumno/"+ idAlumno);
}
  

}
