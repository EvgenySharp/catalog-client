import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    
    constructor(private auth: AuthService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.auth.IsAuthenticated()){
          req = req.clone({
            setHeaders:{
              Authenticator: this.auth.GetToken()
            }
          })
        }
        return next.handle(req)
    }
}