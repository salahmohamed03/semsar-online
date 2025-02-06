import { AuthService } from './../../Services/auth.service';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../Services/company.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public CompanyExists = signal<boolean>(false);
  constructor(private authService:AuthService,private companyService:CompanyService) {
    this.hasCompany();
  }
  isLoggedIn():boolean{
    return this.authService.isValidToken();
  };
  logout(){
    this.authService.logout();
  }
  getUserDetails(){
    // if(!this.authService.isAuthenticated())
    //   return null;
    return this.authService.getUserDetails();
  }
  toggleMenu(){
    document.getElementById('menu')?.classList.toggle('hideMenu');
  }
  hasCompany(){
    this.companyService.getMyCompany().subscribe({
      next: (company) => {
        this.CompanyExists.set(true);
      },
      error: (error) => {
        this.CompanyExists.set(false);
      }
    })
  }
}

