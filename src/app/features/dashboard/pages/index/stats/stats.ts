import { CardComponent } from '@/shared/ui';
import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
    bootstrapCoin,
    bootstrapExclamationTriangle,
    bootstrapPerson,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
    selector: 'dashboard-index-stats',
    imports: [CardComponent, NgIcon, DecimalPipe],
    template: `
        <section class="dashboard-grid">
            <ui-card>
                <h3 class="card-title">
                    <ng-icon name="bootstrapPerson" size="32"></ng-icon> Total Brigadas
                </h3>
                <p id="stat-total-brigadas" class="stat-value">
                    {{ totalBrigades() | number: '1.0-0' : 'es' }}
                </p>
            </ui-card>
            <ui-card>
                <h3 class="card-title">
                    <ng-icon name="bootstrapCoin" color="var(--primary)" size="32"></ng-icon> Oro
                    Inscripciones
                </h3>
                <p id="stat-oro-inscripciones" class="stat-value letter-green">
                    {{ totalGoldInscriptions() | number: '1.2-2' : 'es' }} g
                </p>
            </ui-card>
            <ui-card>
                <h3 class="card-title">
                    <ng-icon
                        name="bootstrapExclamationTriangle"
                        color="var(--secondary)"
                        size="32"
                    ></ng-icon>
                    Deuda Arrime
                </h3>
                <p id="stat-oro-deuda" class="stat-value letter-yellow">
                    {{ totalGoldDebt() | number: '1.2-2' : 'es' }} g
                </p>
            </ui-card>
        </section>
    `,
    styles: `
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .stat-value {
            font-size: 2.2rem;
            font-weight: 700;

            &.letter-yellow {
                color: var(--secondary);
            }

            &.letter-green {
                color: var(--primary);
            }
        }

        .card-title {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 1rem;
            font-weight: 500;
        }
    `,
    viewProviders: [provideIcons({ bootstrapPerson, bootstrapCoin, bootstrapExclamationTriangle })],
})
export class Stats {
    // Internal state values
    totalBrigades = signal<number>(400).asReadonly();
    totalGoldInscriptions = signal<number>(23.6).asReadonly();
    totalGoldDebt = signal<number>(1254.9).asReadonly();
}
