import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent, CardComponent, SelectOption, TableComponent } from '@/shared/ui';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPlus } from '@ng-icons/bootstrap-icons';
import { ProductForm } from './product-form/product-form';
import { InventoryForm } from './inventory-form/inventory-form';

interface ProductsTable {
    product: string;
    price: number;
    stock: number;
    distribution: {
        center: string;
        stock: string;
    }[];
}
@Component({
    selector: 'app-products',
    imports: [
        ButtonComponent,
        CardComponent,
        TableComponent,
        DecimalPipe,
        ReactiveFormsModule,
        NgIcon,
        ProductForm,
        InventoryForm,
    ],
    templateUrl: './products.html',
    styleUrl: './products.css',
    viewProviders: [provideIcons({ bootstrapPlus })],
})
export class Products implements OnInit {
    // Injectando dependencias
    #fb = inject(NonNullableFormBuilder);

    // OnInit function
    ngOnInit() {
        this.distributionOptions.set([
            {
                label: 'Litros',
                value: 'LITROS',
            },
            {
                label: 'Gramos',
                value: 'GRAMOS',
            },
            {
                label: 'Unidad (pieza)',
                value: 'UNIDAD',
            },
        ]);
    }

    // Variables internas relacionadas con tabla para mostrar datos
    headers = [
        'producto',
        'precio (oro)',
        'inventario total',
        'distribución por centro',
        'acciones',
    ];
    isLoadingTableData = signal<boolean>(true);
    data = signal<ProductsTable[]>([]);

    showActions(item: ProductsTable) {
        console.info(item);
    }

    // Variables para manejo del modal
    isOpenCreateProduct = signal<boolean>(false);
    createProductModal() {
        this.isOpenCreateProduct.update((value) => !value);
    }

    isOpenNewStock = signal<boolean>(false);
    productId = signal<string | null>(null);
    newStockModal(item: ProductsTable) {
        this.productId.set(item.product);
        this.isOpenNewStock.update((value) => !value);
    }
    closeNewStockModal() {
        this.isOpenNewStock.update((value) => !value);
    }

    isOpenTransferStock = signal<boolean>(false);
    transferStockModal() {
        this.isOpenTransferStock.update((value) => !value);
    }

    distributionOptions = signal<SelectOption[]>([]); // Cargar todos los centros de distribución disponibles desde la base de datos
}
