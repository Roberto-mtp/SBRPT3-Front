export interface ResumenAtaque {
  id: number;
  timestamp: string;
  protocol: string;
  src_ip: string;
  dst_ip: string;
  src_port: number;
  dst_port: number;
  prediction: number;
  proba: number;
}

export interface Ataque {
  id: number;
  timestamp: string; // o Date si lo parseas en el backend
  protocol: string;
  src_ip: string;
  dst_ip: string;
  src_port: number;
  dst_port: number;
  prediction: number;
  proba: number;
}
