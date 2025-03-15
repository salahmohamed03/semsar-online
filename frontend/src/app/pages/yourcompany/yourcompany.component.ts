
import { CompanyService } from './../../Services/company.service';
import { Component, effect, input, Input, signal, OnInit } from '@angular/core';
import { ImageSliderComponent } from '../../Components/image-slider/image-slider.component';
import { PropertyCardComponent } from '../../Components/property-card/property-card.component';
import { User } from '../../Interfaces/user';
import { MatIconModule } from '@angular/material/icon';
import { Company } from '../../Interfaces/company';
import { CommonModule } from '@angular/common';
import { Property } from '../../Interfaces/property';
import { SearchComponent } from '../../Components/search/search.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-yourcompany',
  standalone: true,
  imports: [ RouterLink, FormsModule,CommonModule,ImageSliderComponent, PropertyCardComponent , MatIconModule, SearchComponent],
  templateUrl: './yourcompany.component.html',
  styleUrl: './yourcompany.component.css'
})
export class YourcompanyComponent {


  onFilteredData($event: Property[]|null) {
      this.filteredData.set($event);
      console.log($event);

  }
  filteredData = signal<Property[]|null>(null);


  companyCopy = signal<Company>({
      Id: '1',
      City: 'New York',
      Address: '123 Main St',
      Image: 'image (3).jpg',
      Name: 'John Doe',
      Description: 'This is a real estate company',
      Email: 'example@gmail.com',
      WhatsApp: '011-123-4567',
      Website: 'https://www.example.com'
  });

  company = signal<Company>({
      Id: '1',
      City: 'New York',
      Address: '123 Main St',
      Image: 'image (3).jpg',
      Name: 'John Doe',
      Description: 'This is a real estate company',
      Email: 'example@gmail.com',
      WhatsApp: '011-123-4567',
      Website: 'https://www.example.com'
  });
  @Input() properties: Property[] = [
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
editCity = signal<boolean>(false);
editAddress = signal<boolean>(false);
editName = signal<boolean>(false);
editDescription = signal<boolean>(false);
editEmail = signal<boolean>(false);
editWhatsApp = signal<boolean>(false);
editWebsite = signal<boolean>(false);
editImage = signal<boolean>(false);
isCompanyModified = signal<boolean>(false);

  constructor(private companyService: CompanyService) {
    effect(() => {
      this.isCompanyModified.set(JSON.stringify(this.company()) !== JSON.stringify(this.companyCopy()));
      // log modifications

      console.log('Company:', this.company());
      console.log('Company copy:', this.companyCopy());

      console.log('Company modified:', this.isCompanyModified());
    }, { allowSignalWrites: true });
  }
  OnInit() {
    this.companyService.getMyCompany().subscribe({
      next: (res: Company) => {
        console.log('Company:', res);

        this.companyCopy.set(res);
        this.company.set(res);
    }});

  }
  updateName(event: Event){
    this.company.set({...this.company(), Name: (event.target as HTMLInputElement).value});
    console.log('new name:', this.company().Name);

  }
  updateCity(event: Event){
    this.company.set({...this.company(), City: (event.target as HTMLInputElement).value});
  }
  updateAddress(event: Event){
    this.company.set({...this.company(), Address: (event.target as HTMLInputElement).value});
  }
  updateDescription(event: Event){
    this.company.set({...this.company(), Description: (event.target as HTMLInputElement).value});
  }
  updateEmail(event: Event){
    this.company.set({...this.company(), Email: (event.target as HTMLInputElement).value});
  }
  updateWhatsApp(event: Event){
    this.company.set({...this.company(), WhatsApp: (event.target as HTMLInputElement).value});
  }
  updateWebsite(event: Event){
    this.company.set({...this.company(), Website: (event.target as HTMLInputElement).value});
  }
  updateImage(event: Event){
    this.company.set({...this.company(), Image: (event.target as HTMLInputElement).value});
  }


}
