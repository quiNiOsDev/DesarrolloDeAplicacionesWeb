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

  registrar(data:Autor):Observable<any>{
    return this.http.post(baseUrlAutor, data);
  }
}
