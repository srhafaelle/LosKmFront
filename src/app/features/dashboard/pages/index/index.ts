import { Component, inject, signal } from '@angular/core';
import { Stats } from './stats/stats';
import { CardComponent, TableComponent, ButtonComponent } from '@/shared/ui';
import { DecimalPipe } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { ResponsiveService } from '@/core/responsive-service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';

interface DashboardTable {
    qrCode: string;
    brigade: string;
    monthsDelayed: number;
    totalDebtGold: number;
}
@Component({
    selector: 'app-index',
    imports: [
        CardComponent,
        DecimalPipe,
        Stats,
        TableComponent,
        ButtonComponent,
        QRCodeComponent,
        NgIcon,
    ],
    templateUrl: './index.html',
    styleUrl: './index.css',
    viewProviders: [provideIcons({ lucideExternalLink })],
})
export class Index {
    protected readonly responseService = inject(ResponsiveService);

    // Constantes
    headers = ['código qr', 'brigada', 'meses atraso', `deuda total (oro)`, 'acciones'];

    // Estados para la tabla
    isLoadingTableData = signal<boolean>(false);
    data = signal<DashboardTable[]>([
        {
            qrCode: 'https://adonisjs.com/',
            brigade: 'Prueba',
            monthsDelayed: 2,
            totalDebtGold: 50.3,
        },
        {
            qrCode: 'https://www.npmjs.com/package/angularx-qrcode',
            brigade: 'Prueba',
            monthsDelayed: 2,
            totalDebtGold: 50.3,
        },
        {
            qrCode: 'https://ng-icons.github.io/ng-icons/#/browse-icons?iconset=Bootstrap%20Icons',
            brigade: 'Prueba',
            monthsDelayed: 2,
            totalDebtGold: 50.3,
        },
        {
            qrCode: 'https://www.ufcespanol.com/events',
            brigade: 'Prueba',
            monthsDelayed: 2,
            totalDebtGold: 50.3,
        },
        {
            qrCode: 'https://mangakatana.com/manga/slam-dunk.3475',
            brigade: 'Prueba',
            monthsDelayed: 2,
            totalDebtGold: 50.3,
        },
    ]);

    showActions(item: DashboardTable) {
        console.log(item);
    }
}
