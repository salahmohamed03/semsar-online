import { Input, signal, Component } from '@angular/core';
import { Property } from '../../Interfaces/property';
import { SearchComponent } from '../../Components/search/search.component';
import { PropertyCardComponent } from '../../Components/property-card/property-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [SearchComponent , PropertyCardComponent , CommonModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent {
  onFilteredData($event: Property[]|null) {
        this.filteredData.set($event);
        // console.log($event);

    }
    filteredData = signal<Property[]|null>(null);

    public properties: Property[] = [
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
}
