import { computed, Injectable, signal } from '@angular/core';
import { SbrDashService } from '../sbr-dash/sbr-dash.service';

interface Detection {
  timestamp: string;
  prediction: number;
}

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private socket?: WebSocket;

  // Señal con todas las detecciones recientes
  readonly detections = signal<
    { timestamp: string; prediction: number; src_ip?: string }[]
  >([]);

  // Contadores como signals (¡clave!)
  readonly totalNormal = signal(0);
  readonly totalMalicioso = signal(0);

  // Signal computada que reacciona automáticamente
  readonly stats = computed(() => ({
    normal: this.totalNormal(),
    malicioso: this.totalMalicioso(),
  }));

  constructor(readonly dash: SbrDashService) {
    this.connect();
  }

  private connect(): void {
    this.socket = this.dash.getRealtimeSocket();

    this.socket.onmessage = (event) => {
      const records = JSON.parse(event.data);
      if (!Array.isArray(records)) return;

      const nuevos = records.map((r: any) => ({
        timestamp: new Date().toLocaleTimeString(), // usa hora actual, no la de BD
        prediction: r.prediction,
        src_ip: r.src_ip,
      }));

      // acumular detecciones en vez de sobrescribir
      this.detections.update((prev) => {
        const merged = [...prev, ...nuevos];
        return merged.slice(-20); // conserva las últimas Nº lecturas
      });

      // actualizar contadores progresivamente
      this.totalNormal.update(
        (n) => n + nuevos.filter((r) => r.prediction === 0).length
      );
      this.totalMalicioso.update(
        (n) => n + nuevos.filter((r) => r.prediction === 1).length
      );

      console.log('Nuevos registros:', nuevos);
    };

    this.socket.onopen = () => console.log('WebSocket conectado');
    this.socket.onclose = () => {
      console.warn('WebSocket cerrado, reconectando...');
      setTimeout(() => this.connect(), 2000);
    };
  }

  get data() {
    return this.detections.asReadonly();
  }
}

/* private socket?: WebSocket;
  readonly detections = signal<{ timestamp: string; prediction: number }[]>([]);
  private totalNormal = 0;
  private totalMalicioso = 0;

  constructor(readonly dash: SbrDashService) {
    this.connect();
  }

  private connect(): void {
    this.socket = this.dash.getRealtimeSocket();

    this.socket.onmessage = (event) => {
      const record = JSON.parse(event.data);
      const label = new Date(record.timestamp).toLocaleTimeString();

      if (record.prediction === 0) this.totalNormal++;
      if (record.prediction === 1) this.totalMalicioso++;

      this.detections.update((prev) => {
        const updated = [
          ...prev,
          { timestamp: label, prediction: record.prediction },
        ];
        return updated.slice(-50);
      });
    };
  }

  get stats() {
    return { normal: this.totalNormal, malicioso: this.totalMalicioso };
  }

  get data() {
    return this.detections.asReadonly();
  }
}
 */
