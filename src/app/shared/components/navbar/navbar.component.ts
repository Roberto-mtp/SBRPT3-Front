import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule, 
    DropdownModule, 
    ToggleButtonModule, 
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  //breadcrumb
  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', route: '/' };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateBreadcrumb();
      }
    });
  }

  updateBreadcrumb() {
    // Obtiene la URL sin los parámetros de consulta
    const cleanUrl = this.router.url.split('?')[0];
  
    // Divide la URL en segmentos eliminando espacios vacíos
    const urlSegments = cleanUrl.split('/').filter(segment => segment);
  
    this.items = urlSegments.map((segment, index) => {
      const routePath = '/' + urlSegments.slice(0, index + 1).join('/');
      return { label: this.formatBreadcrumbLabel(segment), route: routePath };
    });
  
    // Agrega el ícono de inicio al principio del breadcrumb
    this.items.unshift(this.home);
  }

  formatBreadcrumbLabel(segment: string): string {
    const labels: { [key: string]: string } = {
      'sbr-dashboard': 'dashboard',
      'ataques': 'ataques',
      

    };
  
    return labels[segment] || segment.replace(/-/g, ' '); // Reemplaza '-' con espacios si no está en el diccionario
  }


  irHome() {
    this.router.navigate(['/']);
  }

}
