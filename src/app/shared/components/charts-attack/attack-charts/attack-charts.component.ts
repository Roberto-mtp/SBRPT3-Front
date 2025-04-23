import { Component, Input, OnInit } from '@angular/core';
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
    CardModule
  ],
  templateUrl: './attack-charts.component.html',
  styleUrl: './attack-charts.component.scss'
})
export class AttackChartsComponent implements OnInit {
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

  constructor(private dashService: SbrDashService) {}

  ngOnInit() {
    if (this.showBarChart) {
      this.dashService.getBarChartData().subscribe(data => this.barChartData = data);
      this.barChartOptions = this.dashService.getBarChartOptions();
    }

    if (this.showLineChart) {
      this.dashService.getLineChartData().subscribe(data => {
        this.fullLabels = data.labels;
        this.fullDataRuido = data.datasets[0].data;
        this.fullDataAtaque = data.datasets[1].data;

        this.lineChartData = {
          labels: [],
          datasets: [
            {
              label: 'Ruido',
              data: [],
              borderColor: '#0E4F70',
              fill: false
            },
            {
              label: 'Ciberataque',
              data: [],
              borderColor: '#F5471D',
              fill: false
            }
          ]
        };

        this.startRealTimeSimulation();
      });

      this.lineChartOptions = this.dashService.getLineChartOptions();
    }
  }

  startRealTimeSimulation() {
    this.intervalId = setInterval(() => {
      if (this.currentIndex < this.fullLabels.length) {
        this.lineChartData.labels.push(this.fullLabels[this.currentIndex]);
        this.lineChartData.datasets[0].data.push(this.fullDataRuido[this.currentIndex]);
        this.lineChartData.datasets[1].data.push(this.fullDataAtaque[this.currentIndex]);
        this.lineChartData = { ...this.lineChartData }; 
        this.currentIndex++;
      } else {
        clearInterval(this.intervalId); // Detener cuando ya se mostró todo
      }
    }, 1000); // cada 5 segundos
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}



    //simulacion cambio de valores

    /* if (this.showBarChart) {
      this.dashService.getBarChartData().subscribe(data => this.barChartData = data);
      this.barChartOptions = this.dashService.getBarChartOptions();
    }
    if (this.showLineChart) {
      this.dashService.getLineChartData().subscribe(data => {
        this.lineChartData = data;
        this.animateLineChart();
    });
      this.lineChartOptions = this.dashService.getLineChartOptions();
    }
    
  }
  animateLineChart() {
    this.intervalId = setInterval(() =>{
      const nuevoRuido = Math.floor(Math.random() * 100);
      const nuevoAtaque = Math.floor(Math.random() * 100);
      const nuevaEtiqueta = 'T' + Math.floor(Math.random() * 100);
      
      //Agregamos los datos al dataset
      this.lineChartData.labels.push(nuevaEtiqueta);
      this.lineChartData.datasets[0].data.push(nuevoRuido);
      this.lineChartData.datasets[1].data.push(nuevoAtaque);

      //Condicion para limitar los puntos
      if (this.lineChartData.labels.length > 10) {
        this.lineChartData.labels.shift();
        this.lineChartData.datasets[0].data.shift();
        this.lineChartData.datasets[1].data.shift();
      }

      //Forzar la actualizacion del chart
      this.lineChartData = { ...this.lineChartData};
    },2000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

} */
