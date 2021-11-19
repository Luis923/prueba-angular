import { CarritoComponent } from './vistas/carrito/carrito.component';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './vistas/login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'carrito/:id/:cantidad', component:CarritoComponent},
  { path:'principal', component:PrincipalComponent},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,CarritoComponent,PrincipalComponent]
