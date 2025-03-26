import { TickOptions, BarControllerChartOptions } from './../../../../node_modules/chart.js/dist/types/index.d';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SbrDashService {
options:any;
  constructor() {}
  

  getBarChartData(): Observable<any> {
    return of({
      labels: ['Ruido', 'Ciberataque'],
      datasets: [
        {
          label: 'Porcentaje',
          data: [50, 80],
          backgroundColor: ['#0E4F70', '#E74C3C'],
          barThickness: 120,  
          maxBarThickness: 140, 
          borderRadius: 5,
        }
      ]
    });
  }

  getLineChartData(): Observable<any> {
    return of({
      labels: ['T10', 'T20', 'T30', 'T40', 'T50', 'T60', 'T70'],
      datasets: [
        { label: 'Ruido', data: [40, 45, 55, 60, 50, 70, 65], borderColor: '#0E4F70', fill: false },
        { label: 'Ciberataque', data: [30, 50, 40, 60, 75, 80, 90], borderColor: '#E74C3C', fill: false }
      ]
    });
  }

  getBarChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio:0.9,
      
      plugins: {
        legend: { display: true, position: 'top' }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 12 } } },
        y: { beginAtZero: true, ticks: { stepSize: 10, font: { size: 12 } } }
      }
    };
  }

  getLineChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio:1.8,
      plugins: {
        legend: { display: true, position: 'top' }
      },
      elements: {
        line: { tension: 0.3, borderWidth: 2 }, // Configuración específica para líneas
        point: { radius: 4 }
      },
      scales: {
        x: { grid: { display: true }, ticks: { font: { size: 12 } } },
        y: { beginAtZero: true, ticks: { stepSize: 10, font: { size: 12 } } }
      }
    };
  }


  getDoughnutChartData(): Observable<any> {
    return of({
      labels: ['Ciberataque', 'Ruido'],
      datasets: [
        { data: [71, 41], backgroundColor: ['#E74C3C', '#0E4F70'] }
      ]
    });
  }

  getChartOptions(): Observable<any> {
    return of({
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    });
  }
}