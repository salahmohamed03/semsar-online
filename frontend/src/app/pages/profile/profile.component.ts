import { Component } from '@angular/core';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../Services/auth.service';
// for routing
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  faSignOutAlt = faSignOutAlt;
  constructor(private authService:AuthService,private router:Router ) {}
  getUserDetails(){
    return this.authService.getUserDetails();
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
