import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { InfoSequencesService } from '../../../services/sequences/info-sequences.service';



@Component({
  selector: 'app-sequences',
  standalone: true,
  imports: [
    BadgeModule,
    CommonModule,

  ],
  templateUrl: './sequences.component.html',
  styleUrl: './sequences.component.scss'
})
export class SequencesComponent implements OnInit {
  @Input() context: 'dashboard' | 'ataques' = 'dashboard'; // 🔹 nuevo input

  data: { notifications: number; normalSequence: number; noiseSequence: number } | null = null;

  constructor(private infoSequencesService: InfoSequencesService) {}

  ngOnInit() {
    this.infoSequencesService.getSequencesData().subscribe(response => {
      this.data = response;
    });
  }
}
