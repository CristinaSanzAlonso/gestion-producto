import { Component, Output, EventEmitter } from '@angular/core';
// importamos las clases necesarias para trabajar con formularios reactivos
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  imports: [ReactiveFormsModule],
  templateUrl: './products-form.html',
  styleUrl: './products-form.css',
})
export class ProductsFormComponent {

  // Output: permite enviar datos desde este componente hijo al padre
  // En este caso, emitimos un evento cuando se crea un producto
  @Output() productoCreado = new EventEmitter<any>();

  //Definimos el formulario reactivo con sus controles y valores por defecto
  formulario = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    category: new FormControl(''),
    image: new FormControl(''),
    active: new FormControl(true)
  });

  //creamos el método enviar
  enviar() {
    // enviamos los datos del formulario al componente padre
    this.productoCreado.emit(this.formulario.value);
    //reseteamos el formulario
    this.formulario.reset(
      {
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        active: true
      }
    )
  }

}
