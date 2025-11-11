import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { SequencesComponent } from '../../shared/components/sequences/sequences.component';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { AtaquesService } from '../../services/ataques/ataques.service';
import {
  Ataque,
  ResumenAtaque,
} from '../../shared/interfaces/ataque/resumen-ataque';
import { ActivatedRoute, Router } from '@angular/router';
import { AttackDetailsModalComponent } from '../../shared/components/attack-details-modal/attack-details-modal.component';

@Component({
  selector: 'app-ataques',
  standalone: true,
  imports: [
    SequencesComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    DialogModule,
    MultiSelectModule,
    CardModule,
    AttackDetailsModalComponent,
  ],
  templateUrl: './ataques.component.html',
  styleUrl: './ataques.component.scss',
})
export class AtaquesComponent implements OnInit {
  resumen!: ResumenAtaque;
  tipoAtaque: string = '';
  hora: string = '';
  datos: any[] = [];
  details: any = [];
  ipSeleccionada: string = '';

  paginatedDatos: any[] = [];

  displayModal: boolean = false;
  selectedFile: any;

  secuenciaPaquetes: number = 0;
  secuenciaTramos: number = 0;

  constructor(
    readonly ataquesService: AtaquesService,
    readonly router: Router,
    readonly route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      const ipSelecionada = params['ip'];
      if (ipSelecionada) {
        this.ipSeleccionada = ipSelecionada;
      }
    });

    // Cargar detalles iniciales
    const detailsResponse = this.ataquesService.getDetalleAtaque(
      this.ipSeleccionada
    );
    detailsResponse.subscribe((data) => {
      this.details = Array.isArray(data) ? data : [data];

      if (this.details.length > 0) {
        this.tipoAtaque = this.details[0].tipo ?? '';
        this.hora = this.details[0].timestamp ?? '';
        this.datos = this.details;
      }

      this.updatePaginatedData();
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.ipSeleccionada = params['ip'];

      if (this.ipSeleccionada) {
        // pedir detalles de esa IP
        this.ataquesService
          .getDetalleAtaque(this.ipSeleccionada)
          .subscribe((data: any) => {
            console.log('Detalle de ataque:', data);

            // aseguramos que this.details sea siempre un array
            this.details = Array.isArray(data) ? data : data.datos ?? [];
          });
      }

      // traer registros generales (últimos ataques) para la tabla principal
      this.ataquesService.getLatest(20).subscribe((res: any[]) => {
        console.log('Registros de ataques:', res);
        this.datos = res ?? [];

        if (this.datos.length > 0) {
          this.secuenciaPaquetes = this.datos.length;

          const tramos = new Set(
            this.datos.map((d: any) => `${d.src_port}-${d.dst_port}`)
          );
          this.secuenciaTramos = tramos.size;

          this.updatePaginatedData();
        }
      });
    });
  }

  first: number = 0;
  rows: number = 4;

  //Informe
  cols: any[] = [
    { field: 'id', header: 'id' },
    { field: 'timestamp', header: 'Tiempo' },
    { field: 'protocol', header: 'Protocolo' },
    { field: 'src_ip', header: 'src_ip' },
    { field: 'dst_ip', header: 'dst_ip' },
    { field: 'src_port', header: 'src_port' },
    { field: 'dst_port', header: 'dst_port' },
    { field: 'prediction', header: 'Predicción' },
    { field: 'proba', header: 'Probabilidad' },
    { field: 'detalles', header: 'Detalles' },
  ];

  //Detalles
  colDetail: any[] = [
    { id_flujo: 'Id de flujo', header: 'Id de flujo' },
    { id_ataque: 'Id de ataque', header: 'Id de ataque' },
    { tipo: 'Tipo', header: 'Tipo' },
    { num_flujos: 'Numero de flujos', header: 'Numero de flujos' },
  ];

  detalles(rowData: any): void {
    const idAtaque = rowData.id_ataque ?? 204; // valor por defecto si falta

    this.ataquesService.getDetalleAtaque(idAtaque).subscribe((data) => {
      this.selectedFile = data;
      this.displayModal = true;
    });
  }

  //Paginación
  updatePaginatedData() {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedDatos = this.datos.slice(start, end);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedData();
  }

  irADashboar() {
    this.router.navigate(['/SecBluRed/sbr-dashboard']);
  }

  selectedAttack: Ataque | null = null;

  Detalles(attack: Ataque) {
    this.selectedAttack = attack;
    this.displayModal = true;
  }

  // Opciones de exportación

  exportarCSV(): void {
    if (!this.datos || this.datos.length === 0) {
      alert('No hay datos disponibles para exportar.');
      return;
    }

    // Encabezados CSV
    const headers = [
      'id',
      'timestamp',
      'protocol',
      'src_ip',
      'dst_ip',
      'src_port',
      'dst_port',
      'prediction',
      'proba',
    ];

    // Generar filas
    const rows = this.datos.map((dato) =>
      [
        dato.id,
        this.formatTimestamp(dato.timestamp),
        dato.protocol,
        dato.src_ip,
        dato.dst_ip,
        dato.src_port,
        dato.dst_port,
        dato.prediction,
        dato.proba.toFixed(3),
      ].join(',')
    );

    // Construir CSV
    const contenido = [headers.join(','), ...rows].join('\n');

    // Descargar archivo
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `log-ataques-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  exportarPDF(): void {
    if (!this.datos || this.datos.length === 0) {
      alert('No hay datos disponibles para exportar.');
      return;
    }

    const doc = new jsPDF();

    // Título
    doc.setFontSize(16);
    doc.text('Reporte de anomalias detectadas', 14, 15);

    // Generar tabla
    autoTable(doc, {
      startY: 25,
      head: [
        [
          'ID',
          'Tiempo',
          'Protocolo',
          'Src IP',
          'Dst IP',
          'Src Port',
          'Dst Port',
          'Predicción',
          'Probabilidad',
        ],
      ],
      body: this.datos.map((dato) => [
        dato.id,
        this.formatTimestamp(dato.timestamp),
        dato.protocol,
        dato.src_ip,
        dato.dst_ip,
        dato.src_port,
        dato.dst_port,
        dato.prediction,
        dato.proba.toFixed(3),
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] }, // azul
    });

    // Descargar
    doc.save(`log-ataques-${new Date().toISOString()}.pdf`);
  }

  formatos = [
    { label: 'Seleccionar formato', value: null },
    { label: 'CSV', value: 'csv' },
    { label: 'PDF', value: 'pdf' },
  ];

  formatoSeleccionado: 'csv' | 'pdf' | null = null;

  exportar(): void {
    if (this.formatoSeleccionado === 'csv') {
      this.exportarCSV();
    } else if (this.formatoSeleccionado === 'pdf') {
      this.exportarPDF();
    }
  }

  private formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp; // fallback si no es válido
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
