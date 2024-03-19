import { Component } from '@angular/core';
import { AuthService } from '../../auth/shares/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../shopping-cart/shares/shopping-cart.service';

@Component({
  selector: 'app-catalog-layout',
  templateUrl: './catalog-layout.component.html',   
  styles: ``
})
export class CatalogLayoutComponent 
{
  protected _navigationLinks = 
  [
    {url:'/home', name: 'Home'},
    {url:'/catalog', name: 'Product'},
    {url:'/shopping-cart', name: 'Cart'},
    {url:'/order', name: 'Order'}
  ]

  constructor(
    private auth: AuthService,
    private router: Router, 
    protected shoppingCartService : ShoppingCartService)
  {

  }

  protected Logout(event: Event)
  {
    event.preventDefault()
    this.auth.Logout()
    this.router.navigate(['/login'])
  }

  protected OpenShoppingCart(event: Event)
  {
    this.router.navigate(['/shopping-cart'])
  }
}
