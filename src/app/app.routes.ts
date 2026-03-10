import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layout/admin-layout/admin-layout.component';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/gestor/login',
        pathMatch: 'full'
    },
    {
        path: 'gestor/login',
        loadComponent: ()=> import('./features/auth/login/login.component')
    },
    {
        path: 'gestor/cadastro',
        loadComponent: ()=> import('./features/auth/register/register.component')
    },
    {
        path: 'gestor',
        component: AdminLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'inicio',
                loadComponent: ()=> import('./features/admin/home/home.component')
            }
        ]
    }
];
