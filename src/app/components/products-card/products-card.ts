import { Component, Input } from '@angular/core';
import { Product } from '../../services/product';

@Component({
  selector: 'app-products-card',
  imports: [],
  templateUrl: './products-card.html',
  styleUrl: './products-card.css',
})
export class ProductsCard {

  @Input() product!: Product;

}
