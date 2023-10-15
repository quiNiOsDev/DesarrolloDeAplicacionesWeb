import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editorial } from '../models/editorial.model';
import { AppSettings } from "../app.settings";
import {Ejemplo} from "../models/ejemplo.model";

const baseUrlPrueba = AppSettings.API_ENDPOINT + '/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  constructor(private http: HttpClient) {}

  registrar(data: Editorial): Observable<any> {
    return this.http.post(baseUrlPrueba, data);
  }

}
