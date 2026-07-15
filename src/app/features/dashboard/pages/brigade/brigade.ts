import { Component, signal } from '@angular/core';
import {
    TabsComponent,
    TabComponent,
    CardComponent,
    TableComponent,
    ButtonComponent,
} from '@/shared/ui';
import { QRCodeComponent } from 'angularx-qrcode';
import { DecimalPipe } from '@angular/common';
import { BrigadeForm } from './brigade-form/brigade-form';
import { BrigadeManagmentForm } from './brigade-managment-form/brigade-managment-form';
import { MinerForm } from './miner-form/miner-form';
import { MinerUpdateForm } from './miner-update-form/miner-update-form';
interface BrigadeTable {
    qr: string;
    name: string;
    goldPaid: number;
    arrimeDebt: number;
}
interface MinerTable {
    dni: string;
    fullName: string;
    position: string;
    brigade: string;
}
@Component({
    selector: 'app-brigade',
    imports: [
        TabsComponent,
        TabComponent,
        CardComponent,
        TableComponent,
        ButtonComponent,
        QRCodeComponent,
        DecimalPipe,
        BrigadeForm,
        BrigadeManagmentForm,
        MinerForm,
        MinerUpdateForm,
    ],
    templateUrl: './brigade.html',
    styleUrl: './brigade.css',
})
export class Brigade {
    isLoading = signal(false);

    // Datos de las tablas
    headersBrigades = ['código qr', 'nombre brigada', 'oro pagado', 'deuda arrime', 'acciones'];
    headersMiners = ['cédula', 'nombres y apellidos', 'cargo', 'brigada principal', 'acciones'];

    dataBrigades = signal<BrigadeTable[]>([]);
    dataMiners = signal<MinerTable[]>([]);

    // Estados de los modales
    isOpenBrigade = signal(false);
    brigadeModal() {
        this.isOpenBrigade.update((value) => !value);
    }

    isOpenBrigadeManagment = signal(false);
    brigadeManagmentModal() {
        this.isOpenBrigadeManagment.update((value) => !value);
    }

    isOpenMiner = signal(false);
    minerModal() {
        this.isOpenMiner.update((value) => !value);
    }

    isOpenMinerUpdate = signal(false);
    minerUpdateModal() {
        this.isOpenMinerUpdate.update((value) => !value);
    }
}
