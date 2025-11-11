import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SbrDashService {
  /* options: any; */
  readonly apiUrl = 'http://127.0.0.1:8000';

  constructor(readonly http: HttpClient) {}

  getLatest(limit: number = 50): Observable<any> {
    return this.http.get(`${this.apiUrl}/latest?limit=${limit}`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  getPredictionLabel(pred: number): string {
    if (pred === 0) return 'Normal';
    if (pred === 1) return 'Malicioso';
    return 'Desconocido';
  }

  // WebSocket para datos en tiempo real
  getRealtimeSocket(): WebSocket {
    return new WebSocket('ws://127.0.0.1:8000/ws/detections');
  }
}
