import { TableModule } from 'primeng/table';
import { Component } from '@angular/core';
import { SequencesComponent } from '../../shared/components/sequences/sequences.component';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { AtaquesService } from '../../services/ataques/ataques.service';
import { ResumenAtaque } from '../../shared/interfaces/ataque/resumen-ataque';



interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}



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
    CardModule

  ],
  templateUrl: './ataques.component.html',
  styleUrl: './ataques.component.scss'
})
export class AtaquesComponent {
  resumen!: ResumenAtaque;
  tipoAtaque: string = '';
  hora: string = '';
  datos: any[] = [];

  paginatedDatos: any[] = [];
  
  constructor(private ataquesService: AtaquesService) {
  this.resumen = this.ataquesService.getResumenAtaque();
  this.tipoAtaque = this.resumen.tipoAtaque;
  this.hora = this.resumen.timestamp;
  this.datos = this.resumen.datos;
  this.updatePaginatedData();
  }

  first: number = 0;
  rows: number = 4;

  cols: any[] = [
    { field: 'src_port', header: 'src_port' },
    { field: 'dst_port', header: 'dst_port' },
    { field: 'payload_size', header: 'payload_size' },
    { field: 'frame_len', header: 'frame_len' },
    { field: 'window_mean', header: 'window_mean' },
    { field: 'window_std', header: 'window_std' },  
    { field: 'detalles', header: 'Detalles' }
  ];

  displayModal: boolean = false;
  selectedFile: any;


  detalles(rowData: any): void {
    this.selectedFile = rowData;
    this.displayModal = true;
  }

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

}
