import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
refresh() {
    console.log(this._authService.isTokenExpired());
}
  _authService: AuthService;
  constructor(private authService:AuthService) {
    this._authService = authService
  }
  logout(){
    this._authService.logout();
  }

}
