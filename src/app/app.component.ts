import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/shares/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit{
  
  title = 'catalog';

  constructor(private auth: AuthService){

  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token')
    if(potentialToken !== null){
      this.auth.SetToken(potentialToken)
    }
  }
}
