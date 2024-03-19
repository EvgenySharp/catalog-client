import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../shares/catalog.service';
import { Observable } from 'rxjs';
import { GetCategoryResponseDto } from '../shares/catalog-detail.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: ``
})
export class HomePageComponent implements OnInit
{
  protected _categories : Observable<GetCategoryResponseDto[]> = new Observable<GetCategoryResponseDto[]>

  constructor(private catalogService : CatalogService){}

  ngOnInit()
  {
    this._categories = this.catalogService.GetGategories()
  }

  protected OnClickCategory(categoryid : any)
  {
    this.catalogService.AddCategoryInFilter(categoryid) 
  }
}
