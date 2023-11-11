import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Libro } from '../models/libro.model';

const baseUrlLibro = AppSettings.API_ENDPOINT + '/libro';

@Injectable({
  providedIn: 'root',
})

export class LibroService {

  constructor(private http: HttpClient) {

  }

  /* PC-02 */
  consultaPorNombre(filtro: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(
      baseUrlLibro + '/listaLibroPorTituloLike/' + filtro
    )
  }

  inserta(obj: Libro): Observable<any> {
    return this.http.post(baseUrlLibro + '/registraLibro', obj);
  }

  actualiza(obj: Libro): Observable<any> {
    return this.http.put(baseUrlLibro + '/actualizaLibro', obj);
  }

  elimina(idLibro: number): Observable<any> {
    return this.http.delete(baseUrlLibro + '/eliminaLibro/' + idLibro);
  }

  /* PC-01 */
  registrar(data: Libro): Observable<any> {
    return this.http.post(baseUrlLibro, data);
  }
  
}
