import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  mymodal= document.querySelector("#idModal")
  imagenes:string[]=[]; 
  products: Product[] = [];
  constructor(
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
     this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  modal(id: string){
    this.imagenes = this.products.filter(product => product.id === id)[0].images;
    
    console.log(this.imagenes);
  }

}
