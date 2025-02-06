import { map } from 'rxjs';
import { Component, Input } from '@angular/core';
import { property } from '../../Interfaces/property';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RouterLink, ImageSliderComponent, MatIconModule ],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
  @Input() property: property = {
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
      Email: 'example@gmail.com',
      WhatsApp: '011-123-4567',
      Website: 'https://www.example.com'
  }
  };
  @Input() imageUrls: string[] = [
    'image (1).jpg',
    'image (2).jpg',
    'image (3).jpg',
    'image (4).jpg'
  ];

}
