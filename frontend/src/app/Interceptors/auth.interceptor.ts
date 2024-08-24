import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../Services/auth.service';
import { catchError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  if(needsAutherization(req.url))
    return next(req);

  const token = localStorage.getItem('token');

  if (token) {
  // console.log('token:', token?.at(0));

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
const needsAutherization = (url:string)=>{
  const includeUrls:string[]=[];
  return includeUrls.some(x => x === url);
};

