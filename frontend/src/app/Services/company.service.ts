import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Company } from '../Interfaces/company';
import { Result } from '../Interfaces/result';
import { catchError, Observable, throwError } from 'rxjs';
import { Property } from '../Interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = `${this.apiUrl}/Company`;

  constructor(private http: HttpClient) {}

  public getMyCompany(): Observable<Company> {
    return this.http.get<Company>(`${this.endpoint}/GetMyCompany`)
      .pipe(catchError(error => this.handleError(error)));
  }

  public addCompany(company: Company): Observable<Result> {
    return this.http.post<Result>(`${this.endpoint}/AddCompany`, company)
      .pipe(catchError(error => this.handleError(error)));
  }

  public updateCompany(company: Company): Observable<Result> {
    return this.http.put<Result>(`${this.endpoint}/UpdateCompany`, company)
      .pipe(catchError(error => this.handleError(error)));
  }

  public deleteCompany(id: number): Observable<Result> {
    return this.http.delete<Result>(`${this.endpoint}/DeleteCompany/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.endpoint}/GetProperties`)
      .pipe(catchError(error => this.handleError(error)));
  }

  public deleteProperty(id: number): Observable<Result> {
    return this.http.delete<Result>(`${this.endpoint}/DeleteProperty/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  public updateProperty(property: Property): Observable<Result> {
    return this.http.put<Result>(`${this.endpoint}/UpdateProperty`, property)
      .pipe(catchError(error => this.handleError(error)));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
