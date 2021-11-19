import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { ListaProductosI } from 'src/app/modelos/listaProductos.interface';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  productosOriginales :ListaProductosI[]
  productos:ListaProductosI[]
  filtroRopaMasculina:boolean = false
  filtroRopaFemenima:boolean = false
  filtroDispositivos:boolean = false
  filtroJoyeria:boolean = false

  cantidad = new FormControl('');

  estiloBotonPresionado:string =  `background-color: rgba(244, 109, 52, 1)`
  estiloBotonNoPresionado:string =  `background-color: white`

  constructor(private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe(data => {
      this.productosOriginales = data
      this.productos = this.productosOriginales
    })
  }

  onAgregarProductoCarrito(id){
    let cantidadProducto = this.cantidad.value
    this.router.navigate(['carrito',id,cantidadProducto])
  }


  onVerTodo(){
      this.filtroDispositivos = false
      this.filtroRopaMasculina = false
      this.filtroRopaFemenima = false
      this.filtroJoyeria = false
      this.productos = this.productosOriginales
  }

  onFiltrarDispositivos(){
    if(!this.filtroDispositivos){
      this.productos = this.productosOriginales.filter(function(productosOriginales) {
        return productosOriginales.category == "electronics";
      });
      this.filtroDispositivos = true
      this.filtroRopaMasculina = false
      this.filtroRopaFemenima = false
      this.filtroJoyeria = false
    }
    else{
      this.productos = this.productosOriginales
      this.filtroDispositivos = false
    }
  }

  onFiltrarRopaMasculina(){
    if(!this.filtroRopaMasculina){
      this.productos = this.productosOriginales.filter(function(productosOriginales) {
        return productosOriginales.category == "men's clothing";
      });
      this.filtroRopaMasculina = true
      this.filtroRopaFemenima = false
      this.filtroDispositivos = false
      this.filtroJoyeria = false
    }
    else{
      this.productos = this.productosOriginales
      this.filtroRopaMasculina = false
    }
  }
  onFiltrarRopaFemenina(){
    if(!this.filtroRopaFemenima){
      this.productos = this.productosOriginales.filter(function(productosOriginales) {
        return productosOriginales.category == "women's clothing";
      });
      this.filtroRopaFemenima = true
      this.filtroRopaMasculina = false
      this.filtroDispositivos = false
      this.filtroJoyeria = false
    }
    else{
      this.productos = this.productosOriginales
      this.filtroRopaFemenima = false
    }
  }
  onFiltrarJoyeria(){
    if(!this.filtroJoyeria){
      this.productos = this.productosOriginales.filter(function(productosOriginales) {
        return productosOriginales.category == "jewelery";
      });
      this.filtroJoyeria = true
      this.filtroRopaMasculina = false
      this.filtroRopaFemenima = false
      this.filtroDispositivos = false
    }
    else{
      this.productos = this.productosOriginales
      this.filtroJoyeria = false
    }
  }
}
