import {
    ModalComponent,
    TabsComponent,
    TabComponent,
    CardComponent,
    ButtonComponent,
    LoadingComponent,
    SelectComponent,
    type SelectOption,
} from '@/shared/ui';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { TurnsService } from './turns-service';
import { TurnResponse } from '@/types';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { form } from '@angular/forms/signals';

@Component({
    selector: 'app-sale-point',
    imports: [
        ButtonComponent,
        CardComponent,
        LoadingComponent,
        ModalComponent,
        ReactiveFormsModule,
        SelectComponent,
        TabsComponent,
        TabComponent,
    ],
    templateUrl: './sale-point.html',
    styleUrl: './sale-point.css',
})
export class SalePoint implements OnInit {
    // Al iniciar este componente revisar si existe un punto de venta abierto para así cargar la información sobre el punto de venta, en su defecto solicitar el modal con el listado de puntos de distribución
    ngOnInit() {
        this.#checkActiveTurn();
    }

    constructor() {
        effect(() => {
            const selected = this.exampleSelectedValue();
            this.shipmentZoneForm.get('puntoDistribucionId')?.setValue(selected?.value ?? '');
            this.shipmentZoneForm.get('nombreCentro')?.setValue(selected?.label ?? '');

            // console.table(this.shipmentZoneForm.getRawValue());
        });
    }

    // Inject services
    #turnService = inject(TurnsService);

    // Formularios para las diferentes acciones:
    // 2. Realizar venta
    // 3. Cerrar turno y generar reporte Z
    #fb = inject(FormBuilder);

    // 1. Seleccionar zona operativa disponible para el usuario
    shipmentZoneForm = this.#fb.group({
        puntoDistribucionId: ['', [Validators.required]],
        nombreCentro: ['', [Validators.required]],
    });
    example = signal<SelectOption[]>([
        {
            value: 'hola',
            label: 'Ejemplo',
        },
        {
            value: 'ahora',
            label: 'Prueba',
        },
        {
            value: 'despues',
            label: 'Probando',
        },
        {
            value: 'adios',
            label: 'Ahora si',
        },
    ]);
    exampleSelectedValue = signal<SelectOption | null>(null);

    // 2. Realizar venta
    sellForm = this.#fb.group({
        tipoVenta: [],
        productoId: [],
        puntoDistribucionId: [],
        cantidad: [0],
        beneficiarioId: [],
        beneficiarioNombre: [],
        observaciones: [''],
    });

    openTurn() {
        if (this.shipmentZoneForm.invalid) {
            console.log('No valido!');
            this.shipmentZoneForm.markAllAsTouched();
            return;
        }

        console.log('Valido!');
        console.table(this.shipmentZoneForm.getRawValue());
    }

    // Modal para seleccionar lugar como contexto para punto de venta
    isSalePointOpen = signal<boolean>(false);
    activeTurn = signal<TurnResponse | null>(null);
    isLoading = signal<boolean>(false);

    openSalePointModal() {
        this.isSalePointOpen.update((value) => !value);
    }

    #checkActiveTurn() {
        this.isLoading.set(true);

        this.#turnService.getOpenTurn().subscribe({
            next: (response: TurnResponse) => {
                this.activeTurn.set(response);
                this.isSalePointOpen.set(false); // El modal no es necesario para este caso
                this.isLoading.set(false);
            },
            error: (error) => {
                console.log(`No active Turn ${error}`);
                this.activeTurn.set(null);

                this.isSalePointOpen.set(true);
                this.isLoading.set(false);
            },
        });
    }
}
