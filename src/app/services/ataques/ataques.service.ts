import { Injectable } from '@angular/core';
import { ResumenAtaque } from '../../shared/interfaces/ataque/resumen-ataque';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AtaquesService {
  readonly baseUrl = 'http://127.0.0.1:8000';

  constructor(readonly http: HttpClient) {}

  getLatest(limit: number = 50): Observable<ResumenAtaque[]> {
    return this.http.get<ResumenAtaque[]>(
      `${this.baseUrl}/latest?limit=${limit}`
    );
  }

  getDetalleAtaque(ip: string): Observable<ResumenAtaque[]> {
    return this.http
      .get<ResumenAtaque[]>(`${this.baseUrl}/latest?limit=200`) // aumentamos el límite
      .pipe(
        map((res) =>
          res.filter(
            (item) =>
              item.src_ip?.trim() === ip.trim() ||
              item.dst_ip?.trim() === ip.trim()
          )
        )
      );
  }

  /* getDetalleAtaque(ip: string): Observable<ResumenAtaque | undefined> {
    return this.http
      .get<ResumenAtaque[]>(`${this.baseUrl}/latest?limit=50`)
      .pipe(map((res) => res.find((item) => item.src_ip === ip)));
  } */
}
