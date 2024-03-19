import { Injectable } from '@angular/core';
import { GetProductResponseDto } from '../../catalog/shares/catalog-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService 
{
  public QuantityProduct = 0
  public ProductPrice = 0
  private catalogApiUrl : string = 'https://localhost:7292/api'  

  constructor(private http:HttpClient) { }

  public GetProductsForCart(): GetProductResponseDto[]
  {     
    let storedData = localStorage.getItem('ProductInCart');
    let products:GetProductResponseDto[] = []
    this.ProductPrice = 0
    if (storedData !== null) 
    { 
      let productIdsArray = JSON.parse(storedData);
      let requestURL = ''
      for (let i = 0; i < productIdsArray.length; i++) 
      {
        requestURL = this.catalogApiUrl + '/products/product/' + productIdsArray[i]
        this.http.get<GetProductResponseDto>(requestURL).subscribe(product => 
        {  
          this.ProductPrice = this.ProductPrice + product.price         
          products.push(product)
        })         
      }
    }      
    return products
  }

  public DeleteProductsFromCart(product: GetProductResponseDto)
  {  
    let storedData = localStorage.getItem('ProductInCart');
    let productsIdArray

    if (storedData != null) 
    {
      productsIdArray = JSON.parse(storedData);
      let elementIndex = productsIdArray.indexOf(product.id);

      if (elementIndex != -1) 
      { 
        productsIdArray.splice(elementIndex, 1)
        localStorage.setItem('ProductInCart', JSON.stringify(productsIdArray));
      }

    }
  }

  public AddProductInCart(productid: any)
  {    
    let storedData = localStorage.getItem('ProductInCart');
    if (storedData===null) 
    {
        let productidArray = [productid];
        localStorage.setItem('ProductInCart', JSON.stringify(productidArray));
        this.QuantityProduct = productidArray.length
    } 
    else 
    {
      let productidArray = JSON.parse(storedData);
      let elementIndex = productidArray.indexOf(productid);      
      if (elementIndex == -1) 
      {
        productidArray.push(productid);
        localStorage.setItem('ProductInCart', JSON.stringify(productidArray));
      }       
      this.QuantityProduct = productidArray.length
    } 

  }
}