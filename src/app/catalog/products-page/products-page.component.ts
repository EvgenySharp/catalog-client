import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../shares/catalog.service';
import { GetProductRequestDto, GetProductResponseDto } from '../shares/catalog-detail.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, } from '@angular/router';
import { ShoppingCartService } from '../../shopping-cart/shares/shopping-cart.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styles: ``
})
export class ProductsPageComponent implements OnInit
{  
  protected _imgName = '1.jpg'
  protected _filtre = 'Title'
  protected _projectOnPage = 0
  protected _page : GetProductRequestDto = new GetProductRequestDto()
  protected _products : Observable<GetProductResponseDto[]> = new Observable<GetProductResponseDto[]>

  constructor( 
    private route : ActivatedRoute, 
    private catalogService : CatalogService, 
    private shoppingCartService : ShoppingCartService)
  {

  }

  ngOnInit() 
  { 
    this.route.params.subscribe(params => 
    {
      if (Object.keys(params).length > 0) 
      {
        const id = params['id']
        this.catalogService.AddCategoryInFilter(id)
      }
      this._products = this.catalogService.GetProductPage()
      this.OnApplyingFilter()
      this.SetProjectOnPage()
    })
  }

  protected OnClickCart(productid : any)
  {
    this.shoppingCartService.AddProductInCart(productid)
  }

  protected OnQuantityChange() 
  {
    this.catalogService.Page = this._page
    this._products = this.catalogService.GetProductPage()
    this.SetProjectOnPage()
  }

  protected OnPageChange() 
  {
    console.log('OnPageChange')
    this.catalogService.Page = this._page
    this._products = this.catalogService.GetProductPage()
    this.SetProjectOnPage()
  }

  protected OnApplyingFilter() 
  {
    if(this._filtre=='Title')
    {
      this._products.pipe(
        map(products => products.sort((a, b) => a.title.localeCompare(b.title))),
        map(sortedProducts => of(sortedProducts))
      ).subscribe(sortedProducts => 
      {
        this._products = sortedProducts
      })
    }
    if(this._filtre=='Price')
    {
      this._products.pipe(
        map(products => products.sort((a, b) => a.price - b.price)),
        map(sortedProducts => of(sortedProducts))
      ).subscribe(sortedProducts => 
      {
        this._products = sortedProducts
      })
    }

  }

  private SetProjectOnPage(){
    let productsLength = new Observable<number>
    productsLength = this._products.pipe(
      map(_products => _products.length)
    )
    productsLength.subscribe(length => 
    {
      this._projectOnPage = length
    })
  }
}
