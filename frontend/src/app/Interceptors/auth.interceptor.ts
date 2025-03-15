import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Skip authentication for public endpoints
  if(isPublicEndpoint(req.url)) {
    return next(req);
  }

  // Get token from service rather than directly from localStorage
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }

  return next(req);
};

// Function to determine if a URL is a public endpoint that doesn't need auth
const isPublicEndpoint = (url: string): boolean => {
  const publicUrls: string[] = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/properties/public'
    // Add other public endpoints
  ];

  return publicUrls.some(publicUrl => url.includes(publicUrl));
};

