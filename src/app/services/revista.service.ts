import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../app.settings";

import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Revista } from "../models/revista.model";

const baseUrlRevista = AppSettings.API_ENDPOINT+ '/revista';
@Injectable({
    providedIn: 'root'
  })
  export class RevistaService{

    constructor(private http:HttpClient) { }
    consultaPorNombre(filtro:string):Observable<Revista[]>{
      return this.http.get<Revista[]>(baseUrlRevista+ "/listaRevistaPorNombreLike/"+filtro);
    }
  
    registrar(data:Revista):Observable<any>{
      return this.http.post(baseUrlRevista+"/registraRevista", data);
    }
  
    actualiza(obj:Revista):Observable<any>{
      return this.http.put(baseUrlRevista +"/actualizaRevista", obj);
    }
  
    elimina(idRevista:number):Observable<any>{
      return this.http.delete(baseUrlRevista+"/eliminaRevista/"+idRevista)
    }
  
  }