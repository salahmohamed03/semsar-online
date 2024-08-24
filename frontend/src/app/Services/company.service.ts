import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Company } from '../Interfaces/company';
import { Result } from '../Interfaces/result';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiurl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  getMyCompany(){
    return this.http.get<Company>(`${this.apiurl}/Company/GetMyCompany`);
  }
  AddCompany(company:Company){
    return this.http.post<Result>(`${this.apiurl}/Company/AddCompany`,company);
  }
}
