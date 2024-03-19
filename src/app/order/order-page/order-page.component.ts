import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../shopping-cart/shares/shopping-cart.service';
import { FormGroup, NgForm } from '@angular/forms';
import { OrderCartService } from '../shares/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styles: ``
})
export class OrderPageComponent implements OnInit{

  private _form : FormGroup | undefined
  
  constructor(
    private route : ActivatedRoute, 
    protected shoppingCartService : ShoppingCartService, 
    protected orderCartService : OrderCartService)
  {
      
  }

  ngOnInit() 
  {
    this.shoppingCartService.GetProductsForCart()
  }  
  
  protected onSubmit(form : NgForm)
  {
    this._form?.disable()    
    this.orderCartService.SendOrder()
  }
}