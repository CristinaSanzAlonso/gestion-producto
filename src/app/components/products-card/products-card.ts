import { Component, Input } from '@angular/core';
import { Product } from '../../services/product';
// Importamos el servicio ProductService (para poder eliminar productos)
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-products-card',
  imports: [],
  templateUrl: './products-card.html',
  styleUrl: './products-card.css',
})
export class ProductsCard {

  // Input: recibe un producto desde el componente padre (ProductsList)
  @Input() product!: Product;

  // Constructor: inyecta el servicio ProductService para poder usar sus métodos
  constructor(private productService: ProductService) { }

  //añadimos el método eliminar, llama al servicio para borrar el producto actual usando su ID
  eliminar() {
    this.productService.eliminarProducto(this.product._id);
  }

}
