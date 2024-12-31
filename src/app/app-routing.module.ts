import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

const routes: Routes = [
{
  path: 'home',
  component:HomeComponent
},
{
  path: 'cart',
  component:CartComponent
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{ path: 'product-details/:id', component: ProductDetailsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
