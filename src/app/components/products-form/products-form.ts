import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  imports: [ReactiveFormsModule],
  templateUrl: './products-form.html',
  styleUrl: './products-form.css',
})
export class ProductsFormComponent {

  //Los datos los enviamos al padre con output
  @Output() productoCreado = new EventEmitter<any>();

  //Hacemos el grupo de formulario con los valores por defecto
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
