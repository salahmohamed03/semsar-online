import { AuthService } from './../Services/auth.service';
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { AuthResponse } from '../Interfaces/auth-response';
let authService: AuthService;
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthService);
  authService = _authService;
  return next(req).pipe(
    catchError(e => tryRefreshToken(e, next, req))
  );
};

function tryRefreshToken(e: HttpErrorResponse, nextr: HttpHandlerFn, req: HttpRequest<any>): Observable<any> {

  const isLoggedIn = authService.getToken() != null;
  const email = authService.getUserDetails()?.email;

  if (e.status === 401 && isLoggedIn) {
    console.log("Refreshing token...");

    // Attempt to refresh the token
    return authService.RefreshToken(email).pipe(
      switchMap((res) => {

        console.log("Token refreshed successfully");
        localStorage.setItem('token',res.token);

        console.log("is token expired: ",authService.isTokenExpired());
        // Clone the original request and retry
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.getToken()}`
          }
        });
        return nextr(clonedRequest);
      }),
      catchError(err => {
        authService.logout();
        // Return an observable with the original error to propagate it
        return of(e);
      })
    );
  }
  authService.logout();
  // Return the original error if it's not a 401 status or user is not logged in
  return of(e);
}
