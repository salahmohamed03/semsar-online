import { Injectable } from '@angular/core';
import { LoginRequest } from '../Interfaces/login-request';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../Interfaces/auth-response';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../Interfaces/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  public login(data:LoginRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      map(response => {
        if(response.isAuthenticated){
          localStorage.setItem('token',response.token);
        }
        return response;
      })
    );
  }
  public Register(data:RegisterRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data).pipe(
      map(response => {
        if(response.isAuthenticated){
          localStorage.setItem('token',response.token);
        }
        return response;
      })
    );
  }
  public getUserDetails(){
    const token = localStorage.getItem('token');
    if(token){
      const payload:any = jwtDecode(token);
      const userDetails = {
        id: payload['uid'] as number,
        email: payload['email'] as string,
        username: payload['sub'] as string,
        roles: payload['roles'] as string ,
      }
      return userDetails;
    }
    return null;
  }
  public isAuthenticated():boolean{
    const token = localStorage.getItem('token');
    if(token){
      return !this.isTokenExpired();
    }
    return false;
  }

  isTokenExpired():boolean{
    const token = localStorage.getItem('token');
    if(token){
      const payload = jwtDecode(token);
      const exp = payload['exp']!;
      const now = Date.now()/1000;
      console.log(exp,now);
      return now > exp;
    }
    return true;
  };
  public logout(){
    localStorage.removeItem('token');
  }
  getToken = () => localStorage.getItem('token');
}
