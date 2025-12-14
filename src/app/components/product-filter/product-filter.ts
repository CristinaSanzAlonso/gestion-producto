import { Component } from '@angular/core';
// Importamos CommonModule para poder usar directivas básicas de Angular (ngIf, ngFor, etc.)
import { CommonModule } from '@angular/common';
// Importamos el servicio de productos, que contiene la lógica de filtrado
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-filter.html'
})

//Este componente no filtra directamente la lista.
// Solo recoge los valores del formulario y se los comunica al servicio.
// El servicio es el único responsable de modificar el estado

export class ProductFilterComponent {

  constructor(private productService: ProductService) { }

  //métodos que escuchan los cambios en el formulario y comunican esos cambios al servicio para filtrar

  onNombreChange(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.productService.filtrarPorNombre(valor);
  }

  onCategoriaChange(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.productService.filtrarPorCategoria(valor);
  }

  onActivoChange(event: Event) {
    const marcado = (event.target as HTMLInputElement).checked;
    this.productService.filtrarPorActivo(marcado);
  }
}