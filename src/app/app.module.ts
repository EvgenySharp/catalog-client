import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { TokenInterceptor } from './auth/shares/token-interceptor';
import { CatalogLayoutComponent } from './catalog/catalog-layout/catalog-layout.component';
import { OverviewPageComponent } from './catalog/overview-page/overview-page.component';
import { ShoppingCartPageComponent } from './shopping-cart/shopping-cart-page/shopping-cart-page.component';
import { ProductsPageComponent } from './catalog/products-page/products-page.component';
import { HomePageComponent } from './catalog/home-page/home-page.component';
import { OrderPageComponent } from './order/order-page/order-page.component';
  
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CatalogLayoutComponent,
    OverviewPageComponent,
    ShoppingCartPageComponent,
    ProductsPageComponent,
    HomePageComponent,
    OrderPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



