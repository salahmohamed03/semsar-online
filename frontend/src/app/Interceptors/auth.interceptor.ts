import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('authInterceptor');

  if(needsAutherization(req.url))
    return next(req);

  const authService = Inject('authService');
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
const needsAutherization = (url:string)=>{
  const includeUrls:string[] =[`${environment.apiUrl}`];
  return includeUrls.some(x => x === url);
};

