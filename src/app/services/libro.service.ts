import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Libro } from '../models/libro.model';

const baseUrlLibro = AppSettings.API_ENDPOINT + '/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http: HttpClient) {
    //console.log('baseUrlLibro:', baseUrlLibro);
  }

  registrar(data:Libro): Observable<any> {
    return this.http.post(baseUrlLibro, data);
  }

}
