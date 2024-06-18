import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Transaction } from './transaction';

import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionUrl = 'http://localhost:3000/transactions';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) {
  
   }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl)
      .pipe(
        tap(_ => console.log('Transacciones cargadas')),
      );
  }
}




