import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 url="http://localhost:3000/users"
 urlpdf="http://localhost:3000/pdf"
  constructor(private http: HttpClient) { }
  get(): Observable<any> {
    return this.http.get(this.url);
  }
  post(data): Observable<any> {
    return this.http.post(this.url,data);
  }
  update(id,data): Observable<any> {
    return this.http.put(`${this.url}/${id}`,data);
  }
  delete(id): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  getPdf(user: any): Observable<Blob> {
    
    return this.http.get(this.urlpdf, {
      responseType: 'blob' 
    });
  }
  savePdfToMongo(pdfData: { contentType: string, data: string }): Observable<any> {
    return this.http.post<any>(this.urlpdf, pdfData);
  }
  getPdfById(id: string): Observable<Blob> {
    return this.http.get(`${this.urlpdf}/${id}`, { responseType: 'blob' });
  }
}
