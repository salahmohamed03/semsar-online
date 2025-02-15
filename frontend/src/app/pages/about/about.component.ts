import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  emptyUserImage = environment.emptyUserImage;
  constructor() {
  }
}
