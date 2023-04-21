import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../../environments/environment';
import { Usuario } from '../../interfaces/usuario';
import { APIResponse } from '../../interfaces/apiResponse';




@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpC: HttpClient
  ){ }  



  
  guardar(datos: Usuario): Promise<APIResponse | undefined>{
    const promise = new Promise<APIResponse | undefined>((resolve, reject) => {

      const URL = environment.url + 'usuarios/guardar';
      this.httpC
        .post<APIResponse | undefined>(URL, datos, this.httpHeader)
        .toPromise()
        .then((res: APIResponse | undefined) => {

          resolve(res);
        },
          err => {
            reject(err);
          }
        );
    });

    return promise;
  }
 


  /*

    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: any) {
    //this.messageService.add(`HeroService: ${message}`);
    console.log(message)
  }




}
