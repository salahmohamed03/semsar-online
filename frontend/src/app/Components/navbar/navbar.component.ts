import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService:AuthService) { }
  isLoggedIn():boolean{
    return this.authService.getToken() != null;
  };
  logout(){
    this.authService.logout();
  }
  getUserDetails(){
    return this.authService.getUserDetails();
  }
  toggleMenu(){
    document.getElementById('menu')?.classList.toggle('hideMenu');
  }
}
