// Decorador que marca esta clase como un servicio inyectable en Angular
import { Injectable } from '@angular/core';
// Cliente HTTP de Angular para hacer peticiones a APIs REST
import { HttpClient } from '@angular/common/http';
//Para crear como una base de datos en memoria
import { BehaviorSubject } from 'rxjs';

//definimos la estructura de un producto
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
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class ProductService {
  //url que contiene los productos
  private url = 'https://api.npoint.io/1dee63ad8437c82b24fe'
  //guarda y emite la lista de productos
  private productosSubject = new BehaviorSubject<Product[]>([]);
  //observable que se utilizara para que los compenentes vean los cambios
  productos$ = this.productosSubject.asObservable();
  //array de productos 
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


  //métodos para filtrar por nomnre, categoria y activo

  filtrarPorNombre(nombre: string) {
    const filtrados = this.productosOriginales.filter(p =>
      p.name.toLowerCase().includes(nombre.toLowerCase())
    );
    this.productosSubject.next(filtrados);
  }

  filtrarPorCategoria(categoria: string) {
    const filtrados = this.productosOriginales.filter(p =>
      p.category.toLowerCase().includes(categoria.toLowerCase())
    );
    this.productosSubject.next(filtrados);
  }

  filtrarPorActivo(soloActivos: boolean) {
    const filtrados = soloActivos
      ? this.productosOriginales.filter(p => p.active)
      : this.productosOriginales;

    this.productosSubject.next(filtrados);
  }

}
