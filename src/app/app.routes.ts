import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sbr-dashboard/sbr-dashboard.component').then(
        (h) => h.SbrDashboardComponent
      ),
  },

  {
    path: 'SecBluRed',
    loadComponent: () =>
      import('./shared/components/sidebar/sidebar.component').then(
        (d) => d.SidebarComponent
      ),
    children: [
      {
        path: 'sbr-dashboard',
        loadComponent: () =>
          import('./pages/sbr-dashboard/sbr-dashboard.component').then(
            (e) => e.SbrDashboardComponent
          ),
      },
      {
        path: 'ataques',
        loadComponent: () =>
          import('./pages/ataques/ataques.component').then(
            (e) => e.AtaquesComponent
          ),
      },
    ],
  },
];
