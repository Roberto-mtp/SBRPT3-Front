import { Component, EventEmitter, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    TableModule, 
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
