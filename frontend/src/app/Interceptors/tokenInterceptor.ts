import { AuthService } from './../Services/auth.service';
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from '@angular/core';
import { catchError, Observable, throwError, switchMap } from "rxjs";
import { Router } from '@angular/router';
let authService: AuthService;
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthService);
  const _router = inject(Router)
  authService = _authService;
  return next(req).pipe(
    catchError(e => tryRefreshToken(e, next, req,_router))
  );
};

function tryRefreshToken(e: HttpErrorResponse, nextr: HttpHandlerFn, req: HttpRequest<any>,router : Router): Observable<any> {
  const isLoggedIn = authService.getToken() != null;
  const email = authService.getUserDetails()?.email;

  if (e.status === 401 && isLoggedIn && email) {
    console.log("Refreshing token...");

    return authService.RefreshToken(email).pipe(
      catchError(error => {
        console.error("Error refreshing token:", error);
        authService.logout();
        router.navigate(["/login"]);
        return throwError(() => e);
      }),
      switchMap((response: { isAuthenticated: boolean, token: string }) => {
        if (response.isAuthenticated) {
          console.log("token refreshed successfully");
          localStorage.setItem('token', response.token);
          return nextr(req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.token}`,
              withCredentials: 'true'
            }
          }));
        } else {
          console.log("error refreshing token", response);
          authService.logout();
          router.navigate(["/login"]);
          return throwError(() => e);
        }
      })
    );
  }

  // Return the original error if it's not a 401 status or user is not logged in
  console.log("token error", e);
  return throwError(() => e);
}
