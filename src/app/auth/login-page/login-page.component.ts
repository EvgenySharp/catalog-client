import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shares/auth.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy
{  
  private _form : FormGroup | undefined
  private _aSub : Subscription = new Subscription
  
  constructor(public service : AuthService,
    private router : Router,
    private route : ActivatedRoute)
  {
    
  } 
  
  ngOnInit(): void 
  {
    this.route.queryParams.subscribe(
      (params : Params)=>
      {
        if(params['registered'])
        {
          // сообщение: теперь мы можете войти в систему мпользуя свои данные
        }
        else if(params['accessDenied'])
        {
          // для начала авторицуйтесь
        }      
    })
  }

  ngOnDestroy()
  {
    if (this._aSub)
    {
      this._aSub.unsubscribe()
    } 
 }

  protected onSubmit(form : NgForm)
  {
    this._form?.disable()
    this._aSub = this.service.LoginUser()
      .subscribe(
      {
        next : res =>
        {
          this.router.navigate(['/catalog'])
        },
        error : err =>
        {
          console.log(err)
          this._form?.enable()
        }
      })
  }
}
