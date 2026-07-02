import { MenuItem } from '@/types';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { bootstrapAppleMusic } from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';

@Component({
    selector: 'dashboard-sidebar',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.css',
    viewProviders: [provideIcons({ bootstrapAppleMusic })],
})
export class Sidebar {
    isMobileMenuOpen = signal<boolean>(false);

    menuItems: MenuItem[] = [
        {
            label: 'Dashboard',
            route: '/dashboard/index',
            icon: bootstrapAppleMusic,
        },
        {
            label: 'Brigada',
            route: '/dashboard/brigade',
            icon: bootstrapAppleMusic,
        },
        {
            label: 'Usuarios',
            route: '/dashboard/users',
            icon: bootstrapAppleMusic,
        },
        {
            label: 'Productos',
            route: '/dashboard/products',
            icon: bootstrapAppleMusic,
        },
        {
            label: 'Estadísticas',
            route: '/dashboard/statistics',
            icon: bootstrapAppleMusic,
        },
    ];

    toggleMenu(): void {
        this.isMobileMenuOpen.update((state) => !state);
    }

    closeMenu(): void {
        this.isMobileMenuOpen.set(false);
    }
}
