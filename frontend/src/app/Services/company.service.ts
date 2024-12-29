import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Company } from '../Interfaces/company';
import { Result } from '../Interfaces/result';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiurl = environment.apiUrl;
  httpOptions :any;
  constructor(private http:HttpClient,private auth: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'withCredentials': 'true' ,'Authorization' :`Bearer ${this.auth.getToken()}` }),
      withCredentials: true
    };
  }


  getMyCompany(){
    return this.http.get<Company>(`${this.apiurl}/Company/GetMyCompany`,this.httpOptions);
  }
  AddCompany(company:Company){
    return this.http.post<Result>(`${this.apiurl}/Company/AddCompany`,company);
  }
}
