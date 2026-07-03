import { Component, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SidebarService } from '@/layouts/dashboard/sidebar/sidebar-service';
import { lucideMenu } from '@ng-icons/lucide';

@Component({
    selector: 'dashboard-header',
    imports: [NgIcon],
    templateUrl: './header.html',
    styleUrl: './header.css',
    viewProviders: [provideIcons({ lucideMenu })],
})
export class Header {
    protected sidebar = inject(SidebarService);
}
