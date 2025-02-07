import { Component } from '@angular/core';
import { ImageSliderComponent } from '../../Components/image-slider/image-slider.component';
import { property } from '../../Interfaces/property';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [ImageSliderComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {
  property: property = {
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
    images: ['image (3).jpg', 'image (2).jpg' , 'image (4).jpg'],
    company: {
      Name: 'Company 1',
      Address: 'New York',
      WhatsApp: '1234567890',
      Email: 'company1@example.com'
    }
  }
}
