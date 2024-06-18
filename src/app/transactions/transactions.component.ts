import { Component, NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { Transaction } from './transaction';
import { CommonModule, NgFor } from '@angular/common';
import { TransactionService } from './transaction.service';
import { FormsModule } from '@angular/forms';

export enum OrderDirection {
  DOWN,
  UP
};

type OrderColumn = | 'type' | 'description' | 'category';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [RouterModule,NgFor,CommonModule,
    FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})



export class TransactionsComponent {
  transactions: Transaction[] =[];
  buscarTransaccion: Transaction[] = [];
  search: string = '';

  orderDirection: Record<OrderColumn, OrderDirection> = {
    'type': OrderDirection.UP,
    'description': OrderDirection.UP,
    'category': OrderDirection.UP
  };


  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.getTransactions();
    
  }
  
  onChangeOrder(column: OrderColumn) {
    if (this.orderDirection[column] === OrderDirection.DOWN) {
      this.orderDirection[column] = OrderDirection.UP;
      this.transactions.sort((a, b) => a[column].localeCompare(b[column]))
    } else {
      this.orderDirection[column] = OrderDirection.DOWN;
      this.transactions.sort((a, b) => b[column].localeCompare(a[column]))
    }
  }


  listabuscada(): void {
    if(this.search == ""){
      this.getTransactions();
    }else{
      this.buscarTransaccion = [];
     
        this.transactions = this.transactions.filter((transaction) => {
          return transaction.description.toLowerCase().includes(this.search.toLowerCase());
        }

      
    )};   

  }

getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
    
}



}
