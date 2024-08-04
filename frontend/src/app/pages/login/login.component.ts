import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { AuthResponse } from '../../Interfaces/auth-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService ,private Router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });

  }
  LoginFormSubmit() {
    const loginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    if (this.loginForm.valid) {
      this.authService.login(loginRequest).subscribe((response:AuthResponse) => {
        if (response.isAuthenticated) {
          this.Router.navigate(['/home']);
        }
      });
    }

  }

}
