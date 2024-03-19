import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { CatalogLayoutComponent } from './catalog/catalog-layout/catalog-layout.component';
import { OverviewPageComponent } from './catalog/overview-page/overview-page.component';
import { ShoppingCartPageComponent } from './shopping-cart/shopping-cart-page/shopping-cart-page.component';
import { ProductsPageComponent } from './catalog/products-page/products-page.component';
import { HomePageComponent } from './catalog/home-page/home-page.component';
import { OrderPageComponent } from './order/order-page/order-page.component';

const routes: Routes = [
  {path: '',  redirectTo:'/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},  
  
  {path: '', component: CatalogLayoutComponent, children:[
    {path: 'home', component: HomePageComponent,},
    {path: 'catalog', component: OverviewPageComponent,children:[           
      {path: '', component: ProductsPageComponent,},   
      {path: 'categories/:id', component: ProductsPageComponent,},
      {path: 'catalog/mnufacturers/:id', component: OverviewPageComponent,},
    ]},
    {path: 'shopping-cart', component: ShoppingCartPageComponent,},
    {path: 'order', component: OrderPageComponent,},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
