import { Component ,Input} from '@angular/core';
import { Review } from '../../Interfaces/review';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  Math = Math;
  @Input() review: Review = {
    id: 1,
    rating: 3.3,
    comment: 'This is a great property',
    date: '2025-02-01',
    user: {
      name: 'User 1',
      email: 'examble@gmail.com',
      image: 'image (1).jpg'
    }
  }
  timeSince(): string {
    const date = this.review.date;
    const currentDate = new Date();
    const previousDate = new Date(date);
    const difference = currentDate.getTime() - previousDate.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    if (days > 30) {
      return date;
    }
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    if (days > 0) {
      return days + ' days ago';
    } else if (hours > 0) {
      return hours + ' hours ago';
    } else if (minutes > 0) {
      return minutes + ' minutes ago';
    } else {
      return seconds + ' seconds ago';
    }
  }
  stars(){
    let stars = '';
    for (let i = 0; i < Math.floor(this.review.rating); i++)
      stars+= `<i class="fas fa-star"></i>`
    for(let i = 0; i < Math.ceil(this.review.rating) - Math.floor(this.review.rating); i++)
      stars+= `<i class="fas fa-star-half-alt"></i>`
    for(let i = 0; i < 5 - Math.ceil(this.review.rating); i++)
      stars+= `<i class="far fa-star"></i>`

    return stars;
  }
}
