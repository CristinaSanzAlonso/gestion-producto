import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-products-list',
  imports: [],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})

export class ProductsList {

  productos: Product[] = []

  constructor(private productService: ProductService) {
    this.productService.cargarProductos().subscribe(datos => {
      this.productos = datos;
      console.log('Productos recibidos: ', datos);
    });
  }
}
