import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
  }

  //metodo para cargar productos
  cargarProductos() {
    return this.http.get<Product[]>(this.url)
  }
}
