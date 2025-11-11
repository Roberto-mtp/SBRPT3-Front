import { Component, computed, effect, OnInit } from '@angular/core';
import { SequencesComponent } from '../../shared/components/sequences/sequences.component';
import { InfoSequencesService } from '../../services/sequences/info-sequences.service';
import { AttackChartsComponent } from '../../shared/components/charts-attack/attack-charts/attack-charts.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';
import { RealtimeService } from '../../services/realtime-service/realtime.service';

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
  data: { notifications: number } | null = null;

  totalNotificaciones = computed(() => {
    const stats = this.realtime.stats();
    return stats.malicioso;
  });

  constructor(readonly router: Router, readonly realtime: RealtimeService) {}

  ngOnInit() {
    // Activa flujo de detecciones reales
    this.realtime.data();
  }

  readonly deteccionEffect = effect(() => {
    const detecciones = this.realtime.data();

    const conteo: Record<string, number> = {};

    for (const d of detecciones) {
      if (d.prediction === 1 && d.src_ip) {
        conteo[d.src_ip] = (conteo[d.src_ip] || 0) + 1;
      }
    }

    this.ataques = Object.entries(conteo).map(([ip, amenazas]) => ({
      ip,
      amenazas,
    }));

    this.data = { notifications: this.totalNotificaciones() };
  });

  verAtaque() {
    this.router.navigate(['SecBluRed/ataques']);
  }

  verDetalleIp(ip: string) {
    this.router.navigate(['/SecBluRed/ataques'], { queryParams: { ip } });
  }
}
