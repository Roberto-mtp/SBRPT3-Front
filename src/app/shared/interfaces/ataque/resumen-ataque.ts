export interface ResumenAtaque {
    tipoAtaque: string;
    timestamp: string;
    datos: Ataque[];
}

export interface Ataque {
    src_port: number;
    dst_port: number;
    payload_size: number;
    frame_len: number;
    window_mean: number;
    window_std: number;
    detalles: boolean;
  }