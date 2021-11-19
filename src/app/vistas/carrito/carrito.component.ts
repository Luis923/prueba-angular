import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoI } from 'src/app/modelos/producto.interface';
import { ApiService } from 'src/app/servicios/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  monto :string = ""

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private api:ApiService) { }

  datosProductos:ProductoI[] =[]

  ngOnInit(): void {
    let productoId = this.activatedRoute.snapshot.paramMap.get('id')
    let productoCantidad = this.activatedRoute.snapshot.paramMap.get('cantidad')
    let token = this.getToken()

    this.onAgregarProducto(productoId,productoCantidad)
    let productosLocal = localStorage.getItem("listaProductos")
    this.datosProductos = JSON.parse (productosLocal) || []
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getProductosCarrito(){
    return localStorage.getItem("listaProductos")
  }

  onAgregarProducto(id,cantidadObtenida){
    /* async */
    let cantidadNueva = {
      cantidad : cantidadObtenida
    }
    this.api.getProduct(id).subscribe(data => {
      let nuevoDato = {
        ...data,
        ...cantidadNueva
      }

      this.datosProductos.push(nuevoDato)
      let datosProductosJSON = JSON.stringify(this.datosProductos)
      localStorage.setItem("listaProductos",datosProductosJSON)
      this.onObtenerMonto()
    })
  }

  onQuitarProductoCarrito(idProducto){
    let nuevosDatos = this.datosProductos.filter(function(datosProductos) {
      return datosProductos.id !== idProducto;
    });
    localStorage.removeItem('listaProductos')
    let nuevoDatosJSON = JSON.stringify(nuevosDatos)
    localStorage.setItem("listaProductos",nuevoDatosJSON)
    let productosLocal = localStorage.getItem("listaProductos")
    this.datosProductos = JSON.parse (productosLocal)
    this.onObtenerMonto()
  }

  onRegresarTienda(){
    this.router.navigate(['principal'])
  }

  onObtenerMonto(){
    let precioTotal=0
    this.datosProductos.forEach(datosProducto => {
      precioTotal = precioTotal + (datosProducto.price * datosProducto.cantidad)
    });
    this.monto = precioTotal.toFixed(2)
  }

  onCambioCantidad(id,cantidadCambiada:Event){
    for (let i = 0; i < this.datosProductos.length; i++) {
      if(this.datosProductos[i].id==id){
        this.datosProductos[i].cantidad = parseInt((<HTMLInputElement>cantidadCambiada.target).value)
      }
    }
    let datosProductosJSON = JSON.stringify(this.datosProductos)
    localStorage.setItem("listaProductos",datosProductosJSON)
    let productosLocal = localStorage.getItem("listaProductos")
    this.datosProductos = JSON.parse (productosLocal)
    this.onObtenerMonto()
  }

}
