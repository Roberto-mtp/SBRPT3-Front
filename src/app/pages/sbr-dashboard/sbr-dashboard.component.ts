import { Component, OnInit } from '@angular/core';
import { SequencesComponent } from '../../shared/components/sequences/sequences.component';
import { InfoSequencesService } from '../../services/sequences/info-sequences.service';
import { AttackChartsComponent } from '../../shared/components/charts-attack/attack-charts/attack-charts.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';


interface Registro {
  ip: string;
  amenazas: number;
}


@Component({
  selector: 'app-sbr-dashboard',
  standalone: true,
  imports: [
    SequencesComponent,
    AttackChartsComponent,
    CommonModule,
    ButtonModule,
    PanelModule,
    TableModule,
    BadgeModule
    
  ],
  providers: [InfoSequencesService],
  templateUrl: './sbr-dashboard.component.html',
  styleUrl: './sbr-dashboard.component.scss'
})
export class SbrDashboardComponent {


  constructor(private router:Router, ){}


  ataques: Registro[] = [
    { ip: '192.168.2.20', amenazas: 1 },
    { ip: '192.168.2.30', amenazas: 2 },
    { ip: '192.168.2.40', amenazas: 3 },
  ];

  ruidos: Registro[] = [
    { ip: '192.168.2.50', amenazas: 1 },
    { ip: '192.168.2.40', amenazas: 3 },
    { ip: '192.168.2.30', amenazas: 2 },
  ];


  verAtaque() {
    this.router.navigate(['sbr/ataques'])
  }
}
