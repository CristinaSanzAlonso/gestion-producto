import { Component, signal } from '@angular/core';
import { ProductService, Product } from './services/product';
import { ProductsList } from './components/products-list/products-list';
import { ProductsFormComponent } from './components/products-form/products-form';
import { ProductFilterComponent } from './components/product-filter/product-filter';

@Component({
  selector: 'app-root',
  imports: [ProductsList, ProductsFormComponent, ProductFilterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestion-producto');

  //cargamos el servicio productservice para ver si lo carga al inspeccionar
  constructor(private productService: ProductService) {
    //this.productService.cargarProductos().subscribe(
    //(datos: Product[]) => console.log('Productos: ', datos)
  }

  //acción que recibe el datos del output
  onProductoCreado(producto: any) {
    this.productService.agregarProducto(producto);
  }


}
