import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editorial } from '../models/editorial.model';
import { AppSettings } from '../app.settings';
import { Pais } from '../models/pais.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT + '/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  constructor(private http: HttpClient) {}

  registrar(data: Editorial): Observable<any> {
    return this.http.post(baseUrlPrueba, data);
  }

  listar(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(baseUrlPrueba + '/listar');
  }

  obtener(id: number): Observable<Editorial> {
    return this.http.get<Editorial>(`${baseUrlPrueba}/obtener/${id}`);
  }

  editar(id: number, data: Editorial): Observable<any> {
    return this.http.put(`${baseUrlPrueba}/editarEditorial/${id}`, data);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${baseUrlPrueba}/eliminar/${id}`);
  }
}
