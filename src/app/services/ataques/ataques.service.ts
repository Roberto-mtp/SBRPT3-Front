import { Injectable } from '@angular/core';
import { ResumenAtaque } from '../../shared/interfaces/ataque/resumen-ataque';

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
}
