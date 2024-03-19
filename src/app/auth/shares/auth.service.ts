import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { LoginUserRequestDto, RegisterUserRequestDto } from './auth.models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{  
  public RegisterFormData : RegisterUserRequestDto = new RegisterUserRequestDto()
  public LoginFormData : LoginUserRequestDto = new LoginUserRequestDto()  
  private _authApiUrl : string = environment.ApiGatewayUrl + '/auth'
  private _token = 'null'

  constructor(private http:HttpClient) { }

  public RegisterUser()
  {
    let requestURL : string = this._authApiUrl + '/auth/register'
    return this.http.post(requestURL, this.RegisterFormData)
  }

  public LoginUser() : Observable<{token : string}>
  {
    let requestURL: string = this._authApiUrl + '/auth/login'
    return this.http.post<{token : string}>(requestURL, this.LoginFormData)
    .pipe(
      tap(
        ({token})=>{
          localStorage.setItem('auth-token', token)
          this.SetToken(token)
        }
      )
    )
  }

  public SetToken(token : string)
  {
    this._token = token
  }

  public GetToken() : string
  {
    return this._token
  }

  public IsAuthenticated() : boolean
  {
    return !! this._token
  }

  public Logout()
  {
    this.SetToken('null')
    localStorage.clear()
  }
}
