import { AuthService } from './../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyService } from './../../Services/company.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Company } from '../../Interfaces/company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listwithus',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './listwithus.component.html',
  styleUrl: './listwithus.component.css'
})
export class ListwithusComponent {
  AddComanyForm:FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  constructor(
    private companyService:CompanyService,
    private fb:FormBuilder,
    private authService:AuthService,
    private router :Router) {
    this.AddComanyForm = this.fb.group({
      City: ['', Validators.required],
      Address: ['', Validators.required],

   });
  }
  onFileSelected(event: Event) {``
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  addCompany(){
    if(this.AddComanyForm.invalid){
      return;
    }
    const company:Company = {
      Id: this.authService.getUserDetails()?.id,
      City: this.AddComanyForm.get('City')?.value,
      Address: this.AddComanyForm.get('Address')?.value,
      Image: this.imageUrl
    }
    this.companyService.AddCompany(company).subscribe(
      {
        next: (result) => {
          console.log("result: ",result);

          if(result.isSuccess){
            console.log('Company added successfully');
            this.router.navigate(["/"])
          }else{
            console.log(result.message);
          }
        },
        error: (error) => {
          console.error('Error:', error);
        }
      }
    );
  }
}
