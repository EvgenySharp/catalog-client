import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetCategoryResponseDto, GetManufacturersResponseDto, GetProductRequestDto, GetProductResponseDto } from "./catalog-detail.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CatalogService 
{
  public Page : GetProductRequestDto = new GetProductRequestDto()
  private _catalogApiUrl : string = environment.ApiGatewayUrl + '/catalog'
  private _categoryidforUrl = ''
  private _manufactureridsforUrl = ''
  
  constructor(private http:HttpClient) 
  {
    this._categoryidforUrl = ''
    this._manufactureridsforUrl = ''
  }

  public GetGategories(): Observable<GetCategoryResponseDto[]>
  {    
    let requestURL = this._catalogApiUrl + '/categories/categories'

    return this.http.get<GetCategoryResponseDto[]>(requestURL)        
  }

  public GetManufacturers(): Observable<GetManufacturersResponseDto[]>
  {
    let requestURL = this._catalogApiUrl + '/manufacturers/manufacturers'

    return this.http.get<GetManufacturersResponseDto[]>(requestURL)        
  }
    
  public GetProductPage(): Observable<GetProductResponseDto[]>
  {   
    let pageSize = String(this.Page.PageSize)
    let pageCount = String(this.Page.PageCount)
    let requestURL = this._catalogApiUrl + '/products/page?pageSize=' + pageSize + '&pageCount=' + pageCount

    if(this._categoryidforUrl !=  '')
    {      
      requestURL = requestURL + '&Categoryid='+this._categoryidforUrl
    }
    
    if(this._manufactureridsforUrl !=  '')
    {   
      requestURL = requestURL + '&Manufacturerid='+this._manufactureridsforUrl   
    }
    console.log(requestURL)
    let getProductRequestDto  = new  GetProductRequestDto()
    return this.http.post<GetProductResponseDto[]>(requestURL,  getProductRequestDto)
  }

  public AddCategoryInFilter(categoryid: string)
  {  
    this._categoryidforUrl = String(categoryid)  
  }

  public AddManufacturerInFiltre(manufacturerId: any)
  {    
    let storedData = localStorage.getItem('manufacturerIdArray');
    let manufacturerIdArray
    if (storedData===null) 
    {
      manufacturerIdArray = [manufacturerId];
      localStorage.setItem('manufacturerIdArray', JSON.stringify(manufacturerIdArray));
      this._manufactureridsforUrl = manufacturerIdArray.join('&Manufacturerid=');
      console.log(this._manufactureridsforUrl)        
    } 
    else 
    {
      manufacturerIdArray = JSON.parse(storedData);
      let elementIndex = manufacturerIdArray.indexOf(manufacturerId);
      if (elementIndex == -1) 
      { 
        manufacturerIdArray.push(manufacturerId);
        localStorage.setItem('manufacturerIdArray', JSON.stringify(manufacturerIdArray));
      } 
      else
      {
        manufacturerIdArray.splice(elementIndex, 1)
        localStorage.setItem('manufacturerIdArray', JSON.stringify(manufacturerIdArray));
      }
      this._manufactureridsforUrl = manufacturerIdArray.join('&Manufacturerid=');
    } 
  }
}