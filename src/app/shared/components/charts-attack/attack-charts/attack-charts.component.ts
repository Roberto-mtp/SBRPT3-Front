import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SbrDashService } from '../../../../services/sbr-dash/sbr-dash.service';
import { CommonModule } from '@angular/common';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

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
export class AttackChartsComponent implements OnInit, OnDestroy {
  @Input() showBarChart: boolean = true;
  @Input() showLineChart: boolean = true;
  @Input() showKnob: boolean = true;
  @Input() ciberataque: number = 71;
  @Input() ruido: number = 41;

  barChartData: any;
  lineChartData: any;
  barChartOptions: any;
  lineChartOptions: any;

  private fullLabels: string[] = [];
  private fullDataRuido: number[] = [];
  private fullDataAtaque: number[] = [];
  private currentIndex = 0;
  private intervalId: any;

  constructor(readonly dashService: SbrDashService) {}

  ngOnInit() {
    if (this.showBarChart) {
      this.dashService.getStats().subscribe((res: any) => {
        const stats = res.by_prediction ?? [];

        this.barChartData = {
          labels: stats.map((x: any) =>
            this.dashService.getPredictionLabel(x.prediction)
          ),
          datasets: [
            {
              data: stats.map((x: any) => x.count),
              backgroundColor: ['#0E4F70', '#F5471D'],
              borderRadius: 5,
            },
          ],
        };

        this.barChartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 0.79,
          barPercentage: 0.7,
          plugins: {
            legend: {
              display: false, // 👈 Desactiva la leyenda
            },
          },
        };
      });
    }

    if (this.showLineChart) {
      this.dashService.getLatest().subscribe((res: any[]) => {
        // Preparamos arrays
        this.fullLabels = res
          .map((r) => new Date(r.timestamp))
          .sort((a, b) => a.getTime() - b.getTime())
          .map((d) => d.toLocaleTimeString());
        this.fullDataRuido = res.map((r) => (r.prediction === 0 ? 1 : 0));
        this.fullDataAtaque = res.map((r) => (r.prediction === 1 ? 1 : 0));

        this.lineChartData = {
          labels: [],
          datasets: [
            { label: 'Normal', data: [], borderColor: '#0E4F70', fill: false },
            {
              label: 'Malicioso',
              data: [],
              borderColor: '#F5471D',
              fill: false,
            },
          ],
        };

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
            x: {
              ticks: { maxRotation: 90, minRotation: 45, maxTicksLimit: 10 },
            },
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, font: { size: 8 } },
            },
          },

          animation: { duration: 0 },
          plugins: { legend: { display: true } },
        };

        this.startRealTimeSimulation();
      });
    }
  }

  startRealTimeSimulation() {
    this.intervalId = setInterval(() => {
      if (this.currentIndex < this.fullLabels.length) {
        this.lineChartData.labels.push(this.fullLabels[this.currentIndex]);
        this.lineChartData.datasets[0].data.push(
          this.fullDataRuido[this.currentIndex]
        );
        this.lineChartData.datasets[1].data.push(
          this.fullDataAtaque[this.currentIndex]
        );
        this.lineChartData = { ...this.lineChartData };
        this.currentIndex++;
      } else {
        clearInterval(this.intervalId);
      }
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
