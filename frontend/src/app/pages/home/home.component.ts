
import { AuthService } from './../../Services/auth.service';
import { Component, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from '../../Components/search/search.component';
import { CommonModule } from '@angular/common';
interface SearchQuery {
  query: string;
  type: string;
  status: string;
  minPrice: number|null;
  maxPrice: number|null;
  minNoRooms: number|null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchQuery: WritableSignal<SearchQuery> = signal({
    query: '',
    type: '',
    status: '',
    minPrice: null,
    maxPrice: null,
    minNoRooms: null
    });


  constructor(private authService:AuthService,private router:Router) {
    // if(this.isLoggedIn()){
    //   this.router.navigate(['/listwithus']);
    // }
  }
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
  activeDropdown: string = '';

  toggleDropdown(dropdown: string) {
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = ''; // Close the dropdown if clicking the same one
    } else {
      this.activeDropdown = dropdown; // Open the clicked dropdown and close others
    }
  }
  onMaxPriceChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const price = parseInt(target.value);
    this.searchQuery.set( {...this.searchQuery(), maxPrice: price});

  }
  onMinPriceChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const price = parseInt(target.value);
    this.searchQuery.set({...this.searchQuery(), minPrice: price});
  }
  onNORoomsChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const noRooms = parseInt(target.value);
    this.searchQuery.set({ ...this.searchQuery(), minNoRooms: noRooms });
  }
  onPropertyTypeChange(type: string) {
    this.searchQuery.set({ ...this.searchQuery(), type });
  }
  onBuyChange(status: string) {
    this.searchQuery.set({ ...this.searchQuery(), status });
  }
  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value;
    this.searchQuery.set({ ...this.searchQuery(), query });
  }
}
