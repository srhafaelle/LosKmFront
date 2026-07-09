import { TabComponent, TabsComponent } from '@/shared/ui';
import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-sales-form',
    imports: [TabsComponent, TabComponent],
    templateUrl: './sales-form.html',
    styleUrl: './sales-form.css',
})
export class SalesForm {}
