import { Injectable } from '@angular/core';
import { ResumenAtaque } from '../../shared/interfaces/ataque/resumen-ataque';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtaquesService {

  constructor() { }


  getResumenAtaque(): ResumenAtaque {
    return {
      tipoAtaque: 'PortScan',
      timestamp: new Date().toLocaleTimeString(), // simula hora de backend
      datos:[
      {
        src_port: 443,
        dst_port: 55555,
        payload_size: 1024,
        frame_len: 1514,
        window_mean: 8.67,
        window_std: 2.15,
        detalles: true
      },
      {
        src_port: 80,
        dst_port: 65432,
        payload_size: 512,
        frame_len: 1420,
        window_mean: 5.12,
        window_std: 1.75,
        detalles: true
      },
      {
        src_port: 22,
        dst_port: 60000,
        payload_size: 2048,
        frame_len: 1600,
        window_mean: 11.43,
        window_std: 3.01,
        detalles: true
      },
      {
        src_port: 22,
        dst_port: 60000,
        payload_size: 2048,
        frame_len: 1600,
        window_mean: 11.43,
        window_std: 3.01,
        detalles: true
      },
      {
        src_port: 22,
        dst_port: 60000,
        payload_size: 2048,
        frame_len: 1600,
        window_mean: 11.43,
        window_std: 3.01,
        detalles: true
      },
      {
        src_port: 8080,
        dst_port: 51111,
        payload_size: 900,
        frame_len: 1480,
        window_mean: 6.88,
        window_std: 2.03,
        detalles: true
      }
    ]
  };
}


getDetails(){
  return {
    datos:[
      {
        id_flujo: 'CAwAAAHAqAlywKgCPLMi0Najow',
        fecha_deteccion: '2024-12-18 10:58:22',
        id_ataque: 204,
        tipo: 'PortScan',
        duracion: 18184.452981,
        num_flujos: 7,
        probabilidad: '97%',
        ip: '192.168.2.20'
      },
    ]
  }
}


  getDetalleAtaque(id: number): Observable<any> {
    const detalle = this.getDetails().datos.find(item => item.id_ataque === id);
    return of(detalle).pipe(delay(500)); // simula retardo como un backend real
  }

  getLogs() {
  return {
    datos: [
      {
        id_flujo: 'A1',
        fecha_deteccion: '2024-12-18 10:58:22',
        id_ataque: 201,
        tipo: 'PortScan',
        duracion: 18184,
        num_flujos: 7,
        probabilidad: '97%',
        ip: '192.168.0.1'
      },
      {
        id_flujo: 'A2',
        fecha_deteccion: '2024-12-18 11:01:45',
        id_ataque: 202,
        tipo: 'DDoS',
        duracion: 12450,
        num_flujos: 15,
        probabilidad: '92%',
        ip: '10.0.0.5'
      },
      {
        id_flujo: 'A3',
        fecha_deteccion: '2024-12-18 11:03:12',
        id_ataque: 203,
        tipo: 'Intrusión',
        duracion: 9675,
        num_flujos: 9,
        probabilidad: '88%',
        ip: '172.16.0.2'
      },
      {
        id_flujo: 'A4',
        fecha_deteccion: '2024-12-18 11:06:30',
        id_ataque: 204,
        tipo: 'Malware',
        duracion: 14500,
        num_flujos: 12,
        probabilidad: '91%',
        ip: '192.168.2.4'
      },
      {
        id_flujo: 'A5',
        fecha_deteccion: '2024-12-18 11:08:01',
        id_ataque: 205,
        tipo: 'Phishing',
        duracion: 8000,
        num_flujos: 6,
        probabilidad: '85%',
        ip: '10.10.10.10'
      },
      {
        id_flujo: 'A6',
        fecha_deteccion: '2024-12-18 11:10:11',
        id_ataque: 206,
        tipo: 'Botnet',
        duracion: 19000,
        num_flujos: 20,
        probabilidad: '93%',
        ip: '192.168.1.15'
      },
      {
        id_flujo: 'A7',
        fecha_deteccion: '2024-12-18 11:13:44',
        id_ataque: 207,
        tipo: 'Ransomware',
        duracion: 15000,
        num_flujos: 11,
        probabilidad: '96%',
        ip: '192.168.2.88'
      },
      {
        id_flujo: 'A8',
        fecha_deteccion: '2024-12-18 11:15:22',
        id_ataque: 208,
        tipo: 'SQL Injection',
        duracion: 10000,
        num_flujos: 4,
        probabilidad: '89%',
        ip: '10.0.1.22'
      },
      {
        id_flujo: 'A9',
        fecha_deteccion: '2024-12-18 11:18:00',
        id_ataque: 209,
        tipo: 'XSS',
        duracion: 6000,
        num_flujos: 3,
        probabilidad: '81%',
        ip: '172.16.1.1'
      },
      {
        id_flujo: 'A10',
        fecha_deteccion: '2024-12-18 11:20:50',
        id_ataque: 210,
        tipo: 'Brute Force',
        duracion: 13400,
        num_flujos: 8,
        probabilidad: '90%',
        ip: '192.168.100.100'
      }
    ]
  };
}


}

