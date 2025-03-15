import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { routes } from './app.routes';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'semsar-online';

  constructor(private router: Router, private authService: AuthService) {
    if(!this.authService.isAuthenticated()){
    {
        this.authService.RefreshToken().subscribe({
          next: () => {},
          error: () => {
            this.authService.logout();
            router.navigate(['/login']);
          }
        })
      }
    }
    console.log('welcome to semsar online');

    // router.navigate(['/addproperty']);
  }

}
