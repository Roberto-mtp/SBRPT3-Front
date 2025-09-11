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
import { SbrDashService } from '../../services/sbr-dash/sbr-dash.service';

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
    BadgeModule,
  ],
  providers: [InfoSequencesService],
  templateUrl: './sbr-dashboard.component.html',
  styleUrl: './sbr-dashboard.component.scss',
})
export class SbrDashboardComponent implements OnInit {
  ataques: Registro[] = [];
  ruidos: Registro[] = [];

  data: { notifications: number } | null = null;

  constructor(readonly router: Router, readonly sbrDashboard: SbrDashService) {}

  ngOnInit(): void {
    // Consumimos stats
    this.sbrDashboard.getStats().subscribe((res) => {
      console.log('Stats:', res);
      this.ataques = res.by_prediction.map((x: any) => ({
        ip: '—',
        amenazas: x.count,
      }));
    });

    // Consumimos latest
    this.sbrDashboard.getLatest().subscribe((res: any[]) => {
      console.log('Últimos registros:', res);

      const conteo: { [ip: string]: number } = {};
      res.forEach((r) => {
        const ip = r.src_ip || '—';
        conteo[ip] = (conteo[ip] || 0) + 1;
      });

      this.ataques = Object.entries(conteo).map(([ip, amenazas]) => ({
        ip,
        amenazas,
      }));
      // 👇 total de anomalías detectadas
      const totalNotificaciones = Object.values(conteo).reduce(
        (acc, val) => acc + val,
        0
      );

      // Pasamos el total al componente <app-sequences>
      this.data = { notifications: totalNotificaciones };
    });
  }

  verAtaque() {
    this.router.navigate(['SecBluRed/ataques']);
  }

  verDetalleIp(ip: string) {
    this.router.navigate(['/SecBluRed/ataques'], { queryParams: { ip } });
  }
}
