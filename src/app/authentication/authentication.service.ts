import { HttpClient } from '@angular/common/http';
import { Injectable, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Login } from './login';
import { Observable, catchError, lastValueFrom, of, tap } from 'rxjs';
import { AccessToken } from '../access-token';
import { IsLoggedIn } from '../islogged-in';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private endpoint = 'http://localhost:3000';
  

  constructor(
    private http: HttpClient
  ) { }


  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

     
      console.error(error);
      console.log("No esta logueado"); 

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  async isLoggedIn(): Promise<boolean> {
    // return lastValueFrom(this.http.get<IsLoggedIn>(`${this.endpoint}/is-logged-in`));

    try {
      const response = await lastValueFrom(this.http.get<IsLoggedIn>(`${this.endpoint}/check-signin`));
      console.log(response.loggedIn);
      if(response.loggedIn == true){
      return response.loggedIn;
      }else{
        return false;
      }
    } catch (error) {
      console.log("No esta loguo");
      return false;
    }
  }

  login(payload: Login): Observable<AccessToken> {
    return this.http.post<AccessToken>(`${this.endpoint}/signin`, payload)
      .pipe(
        tap({ 
          // imprimer el token de acceso en la consola
          next: (accessToken) => {
            console.log(accessToken);
          }
        }),
        catchError(this.handleError<AccessToken>('login'))
      );
  }

  signup(payload: Login): Observable<AccessToken> {
    return this.http.post<AccessToken>(`${this.endpoint}/signup`, payload)
      .pipe(
        tap({
         
        }),
        catchError(this.handleError<AccessToken>('signup'))
      );
  }
 
}
