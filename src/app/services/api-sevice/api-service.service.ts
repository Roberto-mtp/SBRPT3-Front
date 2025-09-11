import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  readonly baseUrl = 'http://127.0.0.1:8000';

  constructor(readonly http: HttpClient) {}

  getLatest(): Observable<any> {
    return this.http.get(`${this.baseUrl}/latest`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  ingest(batch: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ingest`, batch);
  }
}
