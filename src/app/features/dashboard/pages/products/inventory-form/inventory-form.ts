import { NumberOnly } from '@/shared/directives/number-only';
import {
    ButtonComponent,
    InputComponent,
    ModalComponent,
    SelectComponent,
    SelectOption,
} from '@/shared/ui';
import { Component, inject, input, model, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product-service';

@Component({
    selector: 'dashboard-inventory-form',
    imports: [
        ReactiveFormsModule,
        ModalComponent,
        ButtonComponent,
        InputComponent,
        SelectComponent,
        NumberOnly,
    ],
    templateUrl: './inventory-form.html',
    styleUrl: './inventory-form.css',
})
export class InventoryForm {
    #fb = inject(NonNullableFormBuilder);
    #productService = inject(ProductService);

    productId = model.required<string | null>();
    isOpen = input.required<boolean>();
    distributionOptions = input<SelectOption[]>([]);
    close = output<void>();

    closeModal() {
        this.insertStockForm.reset();
        this.productId.set(null);
        this.close.emit();
    }

    insertStockForm = this.#fb.group({
        productId: ['', [Validators.required]],
        receptorId: ['', [Validators.required]],
        quantity: ['', [Validators.required, Validators.min(0)]],
        recipt: ['', [Validators.required]],
    });

    distributionValue = signal<SelectOption | null>(null);

    receptorValue() {
        const receptor = this.distributionValue()?.value;

        if (receptor) {
            this.insertStockForm.controls.receptorId.setValue(receptor);
        }
    }

    productValue() {
        const id = this.productId();

        if (id) {
            this.insertStockForm.controls.productId.setValue(id);
        }
    }

    insertStock() {
        if (this.insertStockForm.invalid) {
            // Lógica para obtener los errores dentro del formulario antes de enviarlos
            return;
        }

        // Siempre poner el receptor value antes para que se envie la información completa
        this.receptorValue();
        this.productValue();

        const { productId, ...payload } = this.insertStockForm.getRawValue();

        // Lógica de cómo funciona el formulario de este componente
        this.#productService.updateProduct(productId, payload);
        this.closeModal();
    }
}
