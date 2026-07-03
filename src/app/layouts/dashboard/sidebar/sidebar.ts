import { MenuItem } from '@/types';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { bootstrapAppleMusic } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SidebarService } from './sidebar-service';

@Component({
    selector: 'dashboard-sidebar',
    imports: [NgIcon, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.css',
    viewProviders: [provideIcons({ bootstrapAppleMusic })],
})
export class Sidebar {
    protected sidebar = inject(SidebarService);

    menuItems: MenuItem[] = [
        {
            label: 'Dashboard',
            route: '/dashboard/index',
            icon: 'bootstrapAppleMusic',
        },
        {
            label: 'Brigada',
            route: '/dashboard/brigade',
            icon: 'bootstrapAppleMusic',
        },
        {
            label: 'Usuarios',
            route: '/dashboard/users',
            icon: 'bootstrapAppleMusic',
        },
        {
            label: 'Productos',
            route: '/dashboard/products',
            icon: 'bootstrapAppleMusic',
        },
        {
            label: 'Estadísticas',
            route: '/dashboard/statistics',
            icon: 'bootstrapAppleMusic',
        },
    ];
}
