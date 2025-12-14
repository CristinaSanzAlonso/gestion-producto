import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/product';
import { ProductsCard } from '../products-card/products-card';

@Component({
  selector: 'app-products-list',
  imports: [ProductsCard], //importa el compoenente hijo
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})

export class ProductsList {
  //guardamos los productos que vienen del servicio en un array
  productos: Product[] = []

  //inyecta el servicio ProductService
  constructor(private productService: ProductService) {
    // se suscribe al observable productos$ del servicio
    this.productService.productos$.subscribe(productos => {
      // cada vez que el servicio emite una nueva lista, la guardamos en la variable 
      this.productos = productos;
      //mostramos los productos por consola
      console.log('Productos recibidos:', productos);
    });
  }
}
