import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Transaction } from '../transactions/transaction';
import { TransactionService } from '../transactions/transaction.service';
import { json } from 'stream/consumers';
import { CommonModule, NgFor } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  transactions: Transaction[] =[];
 agrupado:any = [];
 categories: string[] = [];


 constructor(
  private transactionService: TransactionService
 ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  ngAfterContentInit() {
  
  }

 getTransactions(): void {
  this.transactionService.getTransactions()
  .pipe(
    tap(transactions => {
      // obtener las categorias de las transacciones diferentes
      this.categories = [...new Set(transactions.map(transaction => transaction.category))];

      // agrupar por categorias y sumar los amount

      this.categories.forEach(category => {
        const transactionsByCategory = transactions.filter(transaction => transaction.category === category);
        const totalAmount = transactionsByCategory.reduce((acc, transaction) => acc + transaction.amount, 0);
        this.agrupado.push({category, totalAmount});
        // console.log(category, totalAmount);
      });
      
    })
  )
    .subscribe(transactions => this.transactions = transactions);



}



}