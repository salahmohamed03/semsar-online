import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageSliderComponent } from '../../Components/image-slider/image-slider.component';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FormsModule, CommonModule, ImageSliderComponent],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {
  isDragging = false;

  removeFile(index: number) {
    if (this.selectedFiles && this.selectedFiles.length > index) {
      this.selectedFiles.splice(index, 1);
      this.previewUrls.splice(index, 1);

      // Update the property images array if needed
      if (this.property.images && this.property.images.length > index + 1) { // +1 because of the default image
        this.property.images.splice(index + 1, 1);
      }
    }
  }

  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.handleFiles(Array.from(input.files));
  }

  handleFiles(files: File[]) {
    this.selectedFiles = [...this.selectedFiles, ...files];

    // Generate preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrls.push(e.target?.result as string);

        // Update property images if needed - storing only file names for now
        this.property.images.push(file.name);
      };
      reader.readAsDataURL(file);
    });
  }

  // Drag and drop handlers
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      const files = Array.from(event.dataTransfer.files).filter(file =>
        file.type.startsWith('image/')
      );

      if (files.length > 0) {
        this.handleFiles(files);
      }
    }
  }

  property = {
    price: 0,
    downPayment: 0,
    rooms: 0,
    area: 0,
    location: '',
    status: '',
    description: '',
    type: '',
    images: ['image (3).jpg']
  }
}
