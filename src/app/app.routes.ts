import { Routes } from '@angular/router';
import { Landing } from '@/layouts/landing/landing';
import { Auth } from '@/layouts/auth/auth';
import { Dashboard } from '@/layouts/dashboard/dashboard';
import { accessGuard } from '@/core/auth';

export const routes: Routes = [
    {
        path: '',
        component: Landing,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('@/pages/landing/principal/principal').then((p) => p.Principal),
            },
            {
                path: 'about',
                loadComponent: () => import('@/pages/landing/about/about').then((p) => p.About),
            },
            {
                path: 'contact',
                loadComponent: () =>
                    import('@/pages/landing/contact/contact').then((p) => p.Contact),
            },
        ],
    },
    {
        path: 'auth',
        component: Auth,
        children: [
            {
                path: 'login',
                loadComponent: () => import('@/pages/auth/login/login').then((p) => p.Login),
            },
        ],
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [accessGuard],
        children: [
            {
                path: 'index',
                loadComponent: () => import('@/pages/dashboard/index').then((p) => p.Index),
                canActivate: [accessGuard],
            },
            {
                path: 'brigade',
                loadComponent: () =>
                    import('@/pages/dashboard/brigade/brigade').then((p) => p.Brigade),
                canActivate: [accessGuard],
            },
            {
                path: 'users',
                loadComponent: () => import('@/pages/dashboard/users/users').then((p) => p.Users),
                canActivate: [accessGuard],
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('@/pages/dashboard/products/products').then((p) => p.Products),
                canActivate: [accessGuard],
            },
            {
                path: 'statistics',
                loadComponent: () =>
                    import('@/pages/dashboard/statistics/statistics').then((p) => p.Statistics),
                canActivate: [accessGuard],
            },
            {
                path: 'sale-point',
                loadComponent: () =>
                    import('@/pages/dashboard/sale-point/sale-point').then((p) => p.SalePoint),
                canActivate: [accessGuard],
            },
        ],
    },
    { path: '**', redirectTo: 'auth/login' },
];
