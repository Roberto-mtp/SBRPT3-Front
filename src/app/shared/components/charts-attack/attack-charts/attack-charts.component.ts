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

  constructor(private dashService: SbrDashService) {}

  ngOnInit() {
    if (this.showBarChart) {
      this.dashService.getBarChartData().subscribe(data => this.barChartData = data);
      this.barChartOptions = this.dashService.getBarChartOptions();
    }
    if (this.showLineChart) {
      this.dashService.getLineChartData().subscribe(data => this.lineChartData = data);
      this.lineChartOptions = this.dashService.getLineChartOptions();
    }
  }
}
