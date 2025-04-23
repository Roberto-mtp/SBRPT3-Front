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
import { ActivatedRoute, Router } from '@angular/router';



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
  details: any = [];
  ipSeleccionada: string = '';

  paginatedDatos: any[] = [];

  displayModal: boolean = false;
  selectedFile: any;

  
  constructor(private ataquesService: AtaquesService, private router:Router, private route:ActivatedRoute) {
  
  this.route.queryParams.subscribe(params => {
    const ipSelecionada = params['ip'];
    if (ipSelecionada) {
      this.ipSeleccionada = ipSelecionada;
    }
  })

    //llamamos al metodo detalle
  this.details = ataquesService.getDetails();

  this.resumen = this.ataquesService.getResumenAtaque();
  this.tipoAtaque = this.resumen.tipoAtaque;
  this.hora = this.resumen.timestamp;
  this.datos = this.resumen.datos;
  this.updatePaginatedData();
  }

  first: number = 0;
  rows: number = 4;

  //Informe
  cols: any[] = [
    { field: 'src_port', header: 'src_port' },
    { field: 'dst_port', header: 'dst_port' },
    { field: 'payload_size', header: 'payload_size' },
    { field: 'frame_len', header: 'frame_len' },
    { field: 'window_mean', header: 'window_mean' },
    { field: 'window_std', header: 'window_std' },  
    
  ];

  //Detalles
  colDetail: any[] = [
    { id_flujo: 'Id de flujo', header: 'Id de flujo'},
    { id_ataque: 'Id de ataque', header: 'Id de ataque' },
    { tipo: 'Tipo', header: 'Tipo' },
    { num_flujos: 'Numero de flujos', header: 'Numero de flujos' },
  ]

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

  irADashboar(){
    this.router.navigate(['/SecBluRed/sbr-dashboard'])
  }

}
