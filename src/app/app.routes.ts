import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/home/home.component').then(h => h.HomeComponent)},
    
    { path: 'sbr',
        loadComponent: () => import('./shared/components/sidebar/sidebar.component').then(d => d.SidebarComponent),
        children:[

        { path: 'home', 
            loadComponent: () => import('./pages/home/home.component').then(h => h.HomeComponent)
        },
        { path: 'sbr-dashboard',
            loadComponent: () => import('./pages/sbr-dashboard/sbr-dashboard.component').then(e => e.SbrDashboardComponent),
        },
        { path: 'ataques',
            loadComponent: () => import('./pages/ataques/ataques.component').then(e => e.AtaquesComponent)
        }

    ]}, 
];
