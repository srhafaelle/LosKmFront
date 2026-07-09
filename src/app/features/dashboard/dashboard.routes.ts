import { accessGuard } from '@/core/auth';
import { Dashboard } from '@/core/layouts/dashboard/dashboard';
import { Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        canActivate: [accessGuard],
        children: [
            {
                path: 'index',
                loadComponent: () =>
                    import('@/features/dashboard/pages/index').then((p) => p.Index),
                canActivate: [accessGuard],
            },
            {
                path: 'brigade',
                loadComponent: () =>
                    import('@/features/dashboard/pages/brigade/brigade').then((p) => p.Brigade),
                canActivate: [accessGuard],
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('@/features/dashboard/pages/users/users').then((p) => p.Users),
                canActivate: [accessGuard],
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('@/features/dashboard/pages/products/products').then((p) => p.Products),
                canActivate: [accessGuard],
            },
            {
                path: 'statistics',
                loadComponent: () =>
                    import('@/features/dashboard/pages/statistics/statistics').then(
                        (p) => p.Statistics,
                    ),
                canActivate: [accessGuard],
            },
            {
                path: 'sale-point',
                loadComponent: () =>
                    import('@/features/dashboard/pages/sale-point/sale-point').then(
                        (p) => p.SalePoint,
                    ),
                canActivate: [accessGuard],
            },
        ],
    },
];

export default routes;
