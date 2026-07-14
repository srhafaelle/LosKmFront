import { NumberOnly } from '@/shared/directives/number-only';
import { ButtonComponent, InputComponent, ModalComponent, SelectOption } from '@/shared/ui';
import { Component, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product-service';

@Component({
    selector: 'dashboard-product-form',
    imports: [ReactiveFormsModule, ModalComponent, ButtonComponent, InputComponent, NumberOnly],
    templateUrl: './product-form.html',
    styleUrl: './product-form.css',
})
export class ProductForm {
    #fb = inject(NonNullableFormBuilder);
    #productService = inject(ProductService);

    isOpen = input.required<boolean>();
    close = output<void>();

    closeModal() {
        this.createProductForm.reset();
        this.close.emit();
    }

    createProductForm = this.#fb.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        messureUnit: ['', [Validators.required]],
    });
    createProductErrors = signal<string[]>([]);

    messureUnitValue = signal<SelectOption | null>(null);
    messureOptions: SelectOption[] = [
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
    ];

    createProduct() {
        if (this.createProductForm.invalid) {
            // Lógica para mostrar todos los errores que tiene el formulario antes de poder enviarlo
            return;
        }

        // Lógica de las acciones a realizar en caso de que el formulario sea exitoso:
        // Cerrar modal, emitir evento para que la tabla pueda cargar la nueva información

        // Lógica de las acciones a realizar en caso de que el formulario tenga errores:
        // Detener la ejecución, guardar mensajes de error, mantener el modal, mostrar mensaje de error

        const payload = this.createProductForm.getRawValue();

        this.#productService.createProduct(payload);
        this.closeModal();
    }
}
