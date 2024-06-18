import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, take, tap, zip } from 'rxjs';
import { Profile } from './profile';
  let headers = new HttpHeaders();
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileUrl = 'http://localhost:3000/users/profile';
  constructor( private http: HttpClient) { }


getProfile(): Observable<any> {

  return this.http.get<any>(this.profileUrl)
  
    .pipe(
       
    );
} 

} 