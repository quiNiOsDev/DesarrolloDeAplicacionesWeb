import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Autor } from '../models/autor.model';

const baseUrlAutor = AppSettings.API_ENDPOINT+ '/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http:HttpClient) { }

  consultaPorNombre(filtro:string):Observable<Autor[]>{
    return this.http.get<Autor[]>(baseUrlAutor+ "/listaAutorPorNombreLike/"+filtro);
  }

  registrar(data:Autor):Observable<any>{
    return this.http.post(baseUrlAutor+"/registraAutor", data);
  }

  actualiza(obj:Autor):Observable<any>{
    return this.http.put(baseUrlAutor +"/actualizaAutor", obj);
  }

  elimina(idAutor:number):Observable<any>{
    return this.http.delete(baseUrlAutor+"/eliminaAutor/"+idAutor)
  }




}
