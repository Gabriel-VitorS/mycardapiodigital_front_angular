import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/gestor/login',
        pathMatch: 'full'
    },
    {
        path: 'gestor/login',
        loadComponent: ()=> import('./features/auth/login/login.component')
    }
];
