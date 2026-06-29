import { Routes } from '@angular/router';
import { Landing } from '@/layouts/landing/landing';
import { Auth } from '@/layouts/auth/auth';

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
];
