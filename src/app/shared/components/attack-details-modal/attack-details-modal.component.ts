import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Ataque } from '../../interfaces/ataque/resumen-ataque';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-attack-details-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './attack-details-modal.component.html',
  styleUrl: './attack-details-modal.component.scss',
})
export class AttackDetailsModalComponent {
  @Input() attack: Ataque | null = null; // 👈 ya no usamos any
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
