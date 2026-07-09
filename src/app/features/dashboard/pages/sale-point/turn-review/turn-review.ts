import { TurnsService } from '@/features/dashboard/services/sale-point/turns-service';
import { CardComponent } from '@/shared/ui';
import { formatErrors } from '@/shared/utils';
import { TurnResponse } from '@/types';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, input, output, signal } from '@angular/core';

@Component({
    selector: 'dashboard-turn-review',
    imports: [CardComponent],
    templateUrl: './turn-review.html',
    styleUrl: './turn-review.css',
})
export class TurnReview {
    readonly #turnService = inject(TurnsService);

    // Valores de entrada sobre el turno que está activo
    activeTurn = input.required<TurnResponse | null>();

    // Respuesta desde el servidor cuando se cierra el turno
    close = output();

    // Variables de estado interno
    isLoading = signal<boolean>(false);
    errors = signal<string[]>([]);
    isTurnActive = computed(() => !!this.activeTurn());

    closeTurn() {
        this.isLoading.set(true);
        this.errors.set([]);

        this.#turnService.closeTurn().subscribe({
            next: () => {
                this.close.emit();
            },
            error: (err: HttpErrorResponse) => {
                const errors = formatErrors(err.error?.errors);
                this.errors.set(errors);
            },
        });
    }
}
