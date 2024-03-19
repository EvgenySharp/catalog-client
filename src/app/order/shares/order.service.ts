import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderRequestDto } from './order.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderCartService 
{
    public OrderFormData : OrderRequestDto = new OrderRequestDto()
    private _orderApiUrl : string = environment.ApiGatewayUrl + '/orders'
    
    constructor(private http:HttpClient) { }

    public SendOrder()
    {
        let requestURL = this._orderApiUrl + '/order'
        return this.http.post(requestURL, this.OrderFormData)
    }
}