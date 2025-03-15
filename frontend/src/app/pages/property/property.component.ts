import { Component, computed, effect, signal } from '@angular/core';
import { ImageSliderComponent } from '../../Components/image-slider/image-slider.component';
import { Property } from '../../Interfaces/property';
import { Review } from '../../Interfaces/review';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../../Components/review/review.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-property',
  standalone: true,
  imports: [ FormsModule,CommonModule,ImageSliderComponent , ReviewComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {
  constructor(private authService: AuthService) {
  }
  property: Property = {
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
  reviews = signal<Review[]> ([
    {
      id: 1,
      rating: 1,
      comment: 'Good property',
      date: '2021-01-01',
      user: {
        name: 'User 1',
        email: 'user1@example.com',
        image: environment.emptyUserImage
      }
    }
  ])

  rating = signal<number>(5)
  comment = ''
  avrStarsHTML = computed(() => {
    let stars = '';
    for (let i = 0; i < Math.floor(this.avrStars()); i++)
      stars+= `<i class="fas fa-star"></i>`
    for(let i = 0; i < Math.ceil(this.avrStars()) - Math.floor(this.avrStars()); i++)
      stars+= `<i class="fas fa-star-half-alt"></i>`
    for(let i = 0; i < 5 - Math.ceil(this.avrStars()); i++)
      stars+= `<i class="far fa-star"></i>`

    return stars;
  })

  avrStars = computed(() => {
    let sum = 0;
    for (let review of this.reviews()) {
      sum += review.rating;
    }
    const avr = sum / this.reviews().length;
    return Number.parseFloat(avr.toPrecision(2));
  })
  onSubmitReview = () => {
    const User = this.authService.getUserDetails();
    const newReview: Review = {
      id: this.reviews().length + 1,
      rating: this.rating(),
      comment: this.comment,
      date: new Date().toLocaleString(),
      user: {
      name: User?.username || '',
      email: User?.email || '',
      image: environment.emptyUserImage
      }
    }
    this.reviews.set([...this.reviews(), newReview])
    this.rating.set(5)
    this.comment = ''
  }

}
