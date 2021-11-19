import { Injectable } from '@angular/core';
import { LoginI} from '../modelos/login.interface'
import { ResponseI } from '../modelos/response.interface'
import { ListaProductosI } from '../modelos/listaProductos.interface';
import { ProductoI } from '../modelos/producto.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://fakestoreapi.com/"

  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "auth/login"

    return this.http.post<ResponseI>(direccion,form)
  }

  getAllProducts():Observable<ListaProductosI[]>{
    let direccion = this.url + "products"
    return this.http.get<ListaProductosI[]>(direccion)
  }

  getProduct(id):Observable<ProductoI>{
    let direccion = this.url + "products/" + id
    return this.http.get<ProductoI>(direccion)
  }

}
