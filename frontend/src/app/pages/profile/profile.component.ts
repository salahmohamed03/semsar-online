import { Component } from '@angular/core';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../Services/auth.service';
import {environment} from '../../../environments/environment.development';
import { PropertyCardComponent } from '../../Components/property-card/property-card.component';
import { property } from '../../Interfaces/property';
import { CommonModule } from '@angular/common';
// for routing
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FontAwesomeModule, PropertyCardComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  faSignOutAlt = faSignOutAlt;
  emptyUserImage = environment.emptyUserImage;
  constructor(private authService:AuthService,private router:Router ) {}
  public properties: property[] = [
        {
          id: 1,
          numberOfRooms: 4,
          area: 2000,
          price: 120000,
          Location: 'New York',
          type: 'House',
          description: 'This is a beautiful house in New York',
          listingDate: '2021-01-01',
          downPayment: 20000,
          status: 'For Sale',
          company: {
            Id: '1',
            City: 'New York',
            Address: '123 Main St',
            Image: 'image (3).jpg',
            Name: 'John Doe',
            Description: 'This is a real estate company',
            Email: '',
            WhatsApp: '',
            Website: ''
        }
      },
      {
        id: 1,
        numberOfRooms: 4,
        area: 2000,
        price: 120000,
        Location: 'New York',
        type: 'House',
        description: 'This is a beautiful house in New York',
        listingDate: '2021-01-01',
        downPayment: 20000,
        status: 'For Sale',
        company: {
          Id: '1',
          City: 'New York',
          Address: '123 Main St',
          Image: 'image (3).jpg',
          Name: 'John Doe',
          Description: 'This is a real estate company',
          Email: '',
          WhatsApp: '',
          Website: ''
      }
    },
    {
      id: 1,
      numberOfRooms: 4,
      area: 2000,
      price: 120000,
      Location: 'New York',
      type: 'House',
      description: 'This is a beautiful house in New York',
      listingDate: '2021-01-01',
      downPayment: 20000,
      status: 'For Sale',
      company: {
        Id: '1',
        City: 'New York',
        Address: '123 Main St',
        Image: 'image (3).jpg',
        Name: 'John Doe',
        Description: 'This is a real estate company',
        Email: '',
        WhatsApp: '',
        Website: ''
    }
    },
    {
      id: 1,
      numberOfRooms: 4,
      area: 2000,
      price: 120000,
      Location: 'New York',
      type: 'House',
      description: 'This is a beautiful house in New York',
      listingDate: '2021-01-01',
      downPayment: 20000,
      status: 'For Sale',
      company: {
        Id: '1',
        City: 'New York',
        Address: '123 Main St',
        Image: 'image (3).jpg',
        Name: 'John Doe',
        Description: 'This is a real estate company',
        Email: '',
        WhatsApp: '',
        Website: ''
    }
    }
    ];
  getUserDetails(){
    return this.authService.getUserDetails();
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
