import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from './cart/cart.component'; 
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'product/:id', component:ProductDetailsComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
