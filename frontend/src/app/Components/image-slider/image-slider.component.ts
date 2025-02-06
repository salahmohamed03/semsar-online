import { Component, OnInit ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {
  @Input() images: string[] = [];
  currentSlide = 0;

  ngOnInit(): void {
  }

  setCurrentSlide(index: number) {
    this.currentSlide = index;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ?
      this.images.length - 1 :
      this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = this.currentSlide === this.images.length - 1 ?
      0 :
      this.currentSlide + 1;
  }
}
