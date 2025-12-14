import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  active: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //recoge el modelo (interfaz de tipo Product) que tranforma en un array de productos
  private url = 'https://api.npoint.io/1dee63ad8437c82b24fe'
  private productosSubject = new BehaviorSubject<Product[]>([]);
  productos$ = this.productosSubject.asObservable();

  private productosOriginales: Product[] = [];

  constructor(private http: HttpClient) {
  }

  /*metodo para cargar productos
  cargarProductos() {
    return this.http.get<Product[]>(this.url)
  }*/

  //modificamos el método cargar para que cuando lo productos lleguen desde la API los guardemos internamente y lo notifiquemos
  //a toda la aplicación con next()
  cargarProductos() {
    this.http.get<Product[]>(this.url).subscribe({
      next: (productos) => {
        this.productosOriginales = productos;
        this.productosSubject.next(productos);
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  //método de agregación de productos con crypto.randomUUID() que genera un ID único automáticamente
  agregarProducto(datos: any) {

    const nuevoProducto: Product = {
      _id: crypto.randomUUID(),   // Generamos un ID único (trampilla)
      name: datos.name,
      description: datos.description,
      price: datos.price,
      category: datos.category,
      image: datos.image,
      active: datos.active
    };

    // Añadimos el nuevo producto al principio de la lista
    this.productosOriginales = [nuevoProducto, ...this.productosOriginales];

    // Emitimos la nueva lista para que Angular actualice la vista
    this.productosSubject.next(this.productosOriginales);
  }

  //método eliminar producto
  eliminarProducto(id: string) {
    this.productosOriginales = this.productosOriginales.filter(p => p._id !== id);
    this.productosSubject.next(this.productosOriginales);
  }

}
