import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageSliderComponent } from '../../Components/image-slider/image-slider.component';

@Component({
  selector: 'app-edit-property',
  standalone: true,
  imports: [FormsModule, CommonModule, ImageSliderComponent],
  templateUrl: './edit-property.component.html',
  styleUrl: './edit-property.component.css'
})
export class EditPropertyComponent implements OnInit {
  // Property to edit
  property = {
    id: 0,
    price: 0,
    downPayment: 0,
    rooms: 0,
    area: 0,
    location: '',
    status: '',
    description: '',
    type: '',
    images: [] as string[]
  };

  // Original property for detecting changes
  originalProperty: any;

  // For tracking file upload
  isDragging = false;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  // To track images that will be deleted
  imagesToDelete: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
    // Add your property service here
  ) {}

  ngOnInit(): void {
    // Get property ID from route parameters
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProperty(id);
      } else {
        // Handle error or redirect
        this.router.navigate(['/properties']);
      }
    });
  }

  // Load property data from API or service
  loadProperty(id: string): void {
    // Example implementation - replace with your actual API call
    // this.propertyService.getProperty(id).subscribe(
    //   (property) => {
    //     this.property = property;
    //     this.originalProperty = { ...property };
    //   },
    //   (error) => {
    //     console.error('Error loading property:', error);
    //   }
    // );

    // For testing - remove in production
    this.property = {
      id: parseInt(id),
      price: 150000,
      downPayment: 30000,
      rooms: 3,
      area: 1500,
      location: 'Cairo, Egypt',
      status: 'for-sale',
      description: 'A beautiful property with a great view',
      type: 'apartment',
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
    };

    this.originalProperty = { ...this.property };
  }

  // Save changes
  saveChanges(): void {
    // Add new images from selectedFiles
    const formData = new FormData();

    // Append all selected files
    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });

    // Add other property data
    formData.append('property', JSON.stringify(this.property));

    // Add list of images to delete
    formData.append('imagesToDelete', JSON.stringify(this.imagesToDelete));

    // Call API to update property
    // this.propertyService.updateProperty(this.property.id, formData).subscribe(
    //   (response) => {
    //     console.log('Property updated successfully');
    //     this.router.navigate(['/properties', this.property.id]);
    //   },
    //   (error) => {
    //     console.error('Error updating property:', error);
    //   }
    // );

    console.log('Saving changes:', this.property);
    console.log('New images:', this.selectedFiles);
    console.log('Images to delete:', this.imagesToDelete);

    // For demo purposes
    alert('Property updated successfully!');
    this.router.navigate(['/yourcompany']);
  }

  // Cancel editing
  cancel(): void {
    this.router.navigate(['/yourcompany']);
  }

  // Image URL helper
  getImageUrl(imageName: string): string {
    // Replace with your actual image URL logic
    return `assets/images/${imageName}`;
  }

  // Remove an existing image
  removeExistingImage(index: number): void {
    if (index >= 0 && index < this.property.images.length) {
      // Add to list of images to delete on server
      this.imagesToDelete.push(this.property.images[index]);

      // Remove from current property
      this.property.images.splice(index, 1);
    }
  }

  // Remove a newly added file
  removeFile(index: number): void {
    if (index >= 0 && index < this.selectedFiles.length) {
      this.selectedFiles.splice(index, 1);
      this.previewUrls.splice(index, 1);
    }
  }

  // Handle file upload
  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.handleFiles(Array.from(input.files));
  }

  // Process selected files
  handleFiles(files: File[]): void {
    this.selectedFiles = [...this.selectedFiles, ...files];

    // Generate preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrls.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  // Drag and drop handlers
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
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
}
