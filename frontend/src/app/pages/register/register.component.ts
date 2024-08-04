import { AuthService } from './../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../Interfaces/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 _authService: AuthService;
 _router: Router;
 registerForm: FormGroup;
 constructor(private fb: FormBuilder ,private authService:AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone : ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      whatsApp : ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      terms : ['', Validators.requiredTrue]
    });
    this._authService = authService
    this._router = router
  }

  RegisterFormSubmition() {
      if (this.registerForm.valid) {
        let data : RegisterRequest = {
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
          username: this.registerForm.get('name')?.value,
          phone: this.registerForm.get('phone')?.value,
          whatsApp: this.registerForm.get('whatsApp')?.value
        };
        console.log(data);

        this._authService.Register(data).subscribe(response => {
          if (response.isAuthenticated) {
            this._router.navigate(['/home']);
          }
        });
      }
    }
}
