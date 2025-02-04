import { Injectable } from '@angular/core';
import { LoginRequest } from '../Interfaces/login-request';
import { catchError, first, map, Observable, firstValueFrom } from 'rxjs';
import { AuthResponse } from '../Interfaces/auth-response';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../Interfaces/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'withCredentials': 'true' }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }
  public login(data:LoginRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/Auth/login`,data,{withCredentials:true}).pipe(
      map(response => {
        if(response.isAuthenticated){
          localStorage.setItem('token',response.token);
        }
        return response
      })
    );
  }
  public Register(data:RegisterRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/Auth/register`, data,{withCredentials:true}).pipe(
      map(response => {
        if(response.isAuthenticated){
          localStorage.setItem('token',response.token);
        }
        return response
      })
    );
  }
  public RefreshToken(Email: string |undefined):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Auth/refreshToken`, { Email: Email },{withCredentials:true}).pipe(
      catchError((err: any): Observable<AuthResponse> => {
        console.error('Error:', err);
        return err;
      })
    );
  }
  public getUserDetails(){
    const token = localStorage.getItem('token');
    if(token){
      const payload:any = jwtDecode(token);
      const userDetails = {
        id: payload['uid'] as string,
        email: payload['email'] as string,
        username: payload['sub'] as string,
        roles: payload['roles'] as string ,
      }
      return userDetails;
    }
    return null;
  }

  public getRefreshToken():Observable<any> {
    return this.http.get<string>(`${this.apiUrl}/Auth/getCookie`,{withCredentials:true}).pipe(
      map(response => {
        return response;
      }),
      catchError(err => {
        console.error('Error:', err);
        return err;
      })
    );
  };
  public isAuthenticated():boolean{
    return !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (!token) return true;
      const payload = jwtDecode<{exp: number, email: string}>(token);
      const exp = payload.exp;
      if (!exp) return true;
      const is_expired = Date.now() >= exp * 1000;

      // if (is_expired) {
      //   try {
      //     const userDetails = this.getUserDetails();
      //     const response = await firstValueFrom(this.RefreshToken(userDetails?.email));
      //     if (response && response.isAuthenticated) {
      //       localStorage.setItem('token', response.token);
      //       return false;
      //     }
      //   } catch (error) {
      //     this.logout();
      //     return true;
      //   }
      // }
      return is_expired;
    } catch {
      return true;
    }
  }
  public logout(){
    localStorage.removeItem('token');
  }
  public getToken(){return localStorage.getItem('token');}
}
