import { Component, OnInit } from '@angular/core';
import { GetProductResponseDto } from '../../catalog/shares/catalog-detail.model';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shares/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styles: ``
})
export class ShoppingCartPageComponent implements OnInit
{
  protected _productsForCart: GetProductResponseDto[] = []
  protected _defaultQuantity = 1

  constructor(
    private route : ActivatedRoute, 
    protected shoppingCartService : ShoppingCartService)
  {
      
  }

  ngOnInit() 
  {
    this.GetProductsForCart()
  }  

  protected DecreaseQuantity(product: GetProductResponseDto) 
  {
    this.CheckProductQuantity(product)
    if (product.quantity > 0) 
    {
      product.quantity--;
      this.shoppingCartService.ProductPrice = this.shoppingCartService.ProductPrice - product.price
    }   

    if (product.quantity == 0) 
    {
      this.shoppingCartService.DeleteProductsFromCart(product)
      window.location.reload();
    }
  }

  protected IncreaseQuantity(product : GetProductResponseDto) 
  {
    this.CheckProductQuantity(product)
    product.quantity ++;    
    this.shoppingCartService.ProductPrice = this.shoppingCartService.ProductPrice + product.price
  }

  private GetProductsForCart()
  {
    this.route.params.subscribe(async params => 
    {
      this._productsForCart = this.shoppingCartService.GetProductsForCart()
    })
  }


  private CheckProductQuantity(product : GetProductResponseDto)
  {
    if(isNaN(product.quantity))
    {
      this.SetProductQuantity(product)
    }
  }

  private SetProductQuantity(product : GetProductResponseDto)
  {
      product.quantity=1
  }
}
