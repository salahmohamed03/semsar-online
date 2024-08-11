
import { catchError } from 'rxjs';
import { Observable, of } from 'rxjs';
import { AuthService } from './../../Services/auth.service';
import { Component, signal } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
refresh() {
}
  constructor(private authService:AuthService) { }
  isLoggedIn():boolean{
    return this.authService.getToken() != null;
  };
  logout(){
    this.authService.logout();
  }

  getRefreshToken() {
    this.authService.getRefreshToken().subscribe(
      {
        next: (token) => {
        },
        error: (error) => {
          console.error('Error:', error);
        }
      }
    );
  }
}
