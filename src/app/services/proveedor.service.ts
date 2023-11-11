import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/proveedor.model';
import { BehaviorSubject, Observable } from 'rxjs';

const baseUrlProveedor = AppSettings.API_ENDPOINT+ '/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  public proveedorList$ : BehaviorSubject<Proveedor[]> = new BehaviorSubject<Proveedor[]>([]);;
  public proveedorListSus = this.proveedorList$.asObservable()

  constructor(private http:HttpClient) { }

  listar(filtro:string):Observable<any>{
    return  this.http.get<Proveedor[]>(baseUrlProveedor +"/listaProveedorPorRazonSocialLike/"+filtro); 
  }

  registrar(data:Proveedor):Observable<any>{
    return this.http.post(baseUrlProveedor+"/registraProveedor", data);
  }

  actualizar(data:Proveedor):Observable<any>{
    return this.http.put(baseUrlProveedor+"/actualizaProveedor", data);
  }

  eliminar(id:number):Observable<any>{
    return this.http.delete(baseUrlProveedor+"/eliminaProveedor/"+id);

  }

  saveObs(lista:any[]){
    this.proveedorList$.next(lista);
  }

  getObs(){
    return this.proveedorListSus;
  }

  
}
