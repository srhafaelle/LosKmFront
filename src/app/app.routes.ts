import { Routes } from '@angular/router';
import { accessGuard } from '@/core/auth';
import { Landing } from '@/core/layouts/landing/landing';
import { Auth } from '@/core/layouts/auth/auth';

export const routes: Routes = [
    {
        path: '',
        component: Landing,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('@/features/landing/principal/principal').then((p) => p.Principal),
            },
            {
                path: 'about',
                loadComponent: () => import('@/features/landing/about/about').then((p) => p.About),
            },
            {
                path: 'contact',
                loadComponent: () =>
                    import('@/features/landing/contact/contact').then((p) => p.Contact),
            },
        ],
    },
    {
        path: 'auth',
        component: Auth,
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('@/features/auth/pages/login/login').then((p) => p.Login),
            },
        ],
    },
    {
        path: 'dashboard',
        loadChildren: () => import('@/features/dashboard/dashboard.routes').then((p) => p.default),
    },
    { path: '**', redirectTo: 'auth/login' },
];
