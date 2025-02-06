import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Company } from '../Interfaces/company';
import { Result } from '../Interfaces/result';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiurl = environment.apiUrl;
  httpOptions :any;
  constructor(private http:HttpClient,private auth: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      }),
      withCredentials: true
    };
  }


  getMyCompany(): Observable<Company> {
    return this.http.get<Company>(`${this.apiurl}/Company/GetMyCompany`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      }),
      withCredentials: true
    });
  }
  AddCompany(company:Company){
    return this.http.post<Result>(`${this.apiurl}/Company/AddCompany`, company, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      }),
      withCredentials: true
    });
  }
}
