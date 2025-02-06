import { Component ,Input ,signal} from '@angular/core';
import { ImageSliderComponent } from '../../Components/image-slider/image-slider.component';
import { PropertyCardComponent } from '../../Components/property-card/property-card.component';
import { User } from '../../Interfaces/user';
import { MatIconModule } from '@angular/material/icon';
import { Company } from '../../Interfaces/company';
import { CommonModule } from '@angular/common';
import { property } from '../../Interfaces/property';
import { SearchComponent } from '../../Components/search/search.component';
@Component({
  selector: 'app-yourcompany',
  standalone: true,
  imports: [CommonModule,ImageSliderComponent, PropertyCardComponent , MatIconModule, SearchComponent],
  templateUrl: './yourcompany.component.html',
  styleUrl: './yourcompany.component.css'
})
export class YourcompanyComponent {


  onFilteredData($event: property[]|null) {
      this.filteredData.set($event);
      console.log($event);

  }
  filteredData = signal<property[]|null>(null);


  @Input() company:Company = {
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
  @Input() properties: property[] = [
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

  imageUrls: string[] = [
    'image (1).jpg',
    'image (2).jpg',
    'image (3).jpg',
    'image (4).jpg'
  ];
}
