import { Component, Input, OnInit } from '@angular/core';
import { CatalogService } from '../shares/catalog.service';
import { GetCategoryResponseDto, GetManufacturersResponseDto, GetProductRequestDto, GetProductResponseDto } from '../shares/catalog-detail.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styles: ``
})
export class OverviewPageComponent implements OnInit
{  
  @Input() data: any;
  public ProjectOnPage = 0
  protected _page : GetProductRequestDto = new GetProductRequestDto()
  protected _categories : Observable<GetCategoryResponseDto[]> = new Observable<GetCategoryResponseDto[]>
  protected _mnufacturers : Observable<GetManufacturersResponseDto[]> = new Observable<GetManufacturersResponseDto[]>

  constructor(
    private catalogService : CatalogService,
    private route : ActivatedRoute, 
    private router: Router)
  {

  }

  ngOnInit() 
  {   
    this._categories = this.catalogService.GetGategories()
    this._mnufacturers = this.catalogService.GetManufacturers()
    localStorage.removeItem('manufacturerIdArray');
  }

  protected OnClickCategory(categoryid : any)
  {
    this.catalogService.AddCategoryInFilter(categoryid) 
  }

  protected OnManufacturerCategory(manufacturerId : any)
  {
    this.catalogService.AddManufacturerInFiltre(manufacturerId)  
  }
}
