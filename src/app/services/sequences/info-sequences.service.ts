import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoSequencesService {
  
  
  getSequencesData(): Observable<{ notifications: number; normalSequence: number; noiseSequence: number }> {
    const mockData = {
      notifications: 35,
      normalSequence: 57,
      noiseSequence: 29
    };
    return of(mockData);
  }
}