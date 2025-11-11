import { Component, effect, ViewChild } from '@angular/core';
import { ChartModule, UIChart } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RealtimeService } from '../../../../services/realtime-service/realtime.service';
@Component({
  selector: 'app-attack-charts',
  standalone: true,
  imports: [
    ChartModule,
    CommonModule,
    KnobModule,
    CommonModule,
    FormsModule,
    CardModule,
  ],
  templateUrl: './attack-charts.component.html',
  styleUrl: './attack-charts.component.scss',
})
export class AttackChartsComponent {
  @ViewChild('barChart') barChartRef?: UIChart;
  @ViewChild('lineChart') lineChartRef?: UIChart;

  lineChartData: any;
  barChartData: any;
  lineChartOptions: any;
  barChartOptions: any;

  maliciosoPercent = 0;
  normalPercent = 0;

  constructor(readonly realtime: RealtimeService) {}

  // Los inicializamos directamente (sin ngOnInit)
  lineEffect = effect(() => {
    const data = this.realtime.data();
    const stats = this.realtime.stats();

    console.log('📈 Stats actuales:', stats);
    // Calcular porcentajes resumen para los knobs
    const total = stats.normal + stats.malicioso;
    if (total > 0) {
      this.maliciosoPercent = Math.round((stats.malicioso / total) * 100);
      this.normalPercent = Math.round((stats.normal / total) * 100);
    }
    // Inicializa solo una vez el gráfico de barras
    if (!this.barChartData) {
      this.barChartData = {
        labels: ['Normal', 'Malicioso'],
        datasets: [
          {
            data: [stats.normal, stats.malicioso],
            backgroundColor: ['#0E4F70', '#F5471D'],
            borderRadius: 5,
          },
        ],
      };
    } else {
      // Solo actualiza los valores sin recrear el objeto
      this.barChartData.datasets[0].data[0] = stats.normal;
      this.barChartData.datasets[0].data[1] = stats.malicioso;
    }

    // Gráfico de línea: este sí puede actualizarse completo
    this.lineChartData = {
      labels: data.map((d) => d.timestamp),
      datasets: [
        {
          label: 'Normal',
          data: data.map((d) => (d.prediction === 0 ? 1 : 0)),
          borderColor: '#0E4F70',
          fill: false,
        },
        {
          label: 'Malicioso',
          data: data.map((d) => (d.prediction === 1 ? 1 : 0)),
          borderColor: '#F5471D',
          fill: false,
        },
      ],
    };

    // 👇 Refrescamos manualmente, pero sin recrear los datasets
    this.barChartRef?.refresh();
    this.lineChartRef?.refresh();
  });

  constructorInit = effect(() => this.initCharts());

  private initCharts() {
    this.lineChartOptions = {
      type: 'line',
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.3,
      elements: {
        line: { tension: 0.3, borderWidth: 2 },
        point: { radius: 4 },
      },
      scales: {
        x: { ticks: { maxRotation: 90, minRotation: 45, maxTicksLimit: 10 } },
        y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 8 } } },
      },
      animation: { duration: 0 },
      plugins: { legend: { display: true } },
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.79,
      barPercentage: 0.7,
      plugins: { legend: { display: false } },
    };
  }
}
