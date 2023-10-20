import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../app.settings";
import { Revista } from "../models/revista.models";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

const baseUrlRevista = AppSettings.API_ENDPOINT+ '/revista';
@Injectable({
    providedIn: 'root'
  })
  export class RevistaService{
    constructor(private http:HttpClient) { }
    registrar(data:Revista):Observable<any>{
      return this.http.post(baseUrlRevista, data);
    }
  
  }