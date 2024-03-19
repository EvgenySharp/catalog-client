import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shares/auth.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnDestroy 
{  
  private form : FormGroup | undefined
  private aSub : Subscription = new Subscription;

  constructor(
    public service : AuthService,
    private router : Router,)
  {

  }  

  ngOnDestroy()
  {
    if(this.aSub)
    {
      this.aSub.unsubscribe()
    }
  }

  onSubmit(form : NgForm)
  {
    this.form?.disable()
    this.aSub = this.service.RegisterUser()
      .subscribe(
      {
        next : res =>
        {
          this.router.navigate(['/login'], 
          {
            queryParams:
            {
              registered : true
            }
          })
        },
        error : err =>
        {
          this.form?.enable()
        }
      })
  }
}
