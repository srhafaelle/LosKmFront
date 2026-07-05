import { Component, computed, input, output } from '@angular/core';

@Component({
    selector: 'ui-button',
    imports: [],
    template: `
        <button
            [type]="type()"
            [class]="context()"
            [disabled]="disabled()"
            (click)="handleClick($event)"
        >
            <ng-content> </ng-content>
        </button>
    `,
    styles: `
        :host {
            width: 100%;
        }
        button {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            padding: 0.5rem 0rem;
            border: solid 1px var(--primary-darker);
            border-radius: var(--radius-default);
            cursor: pointer;
            width: 100%;
            transition:
                box-shadow 300ms ease-in,
                background-color 300ms ease-in-out;
        }

        .button-primary {
            background-color: var(--primary);
            color: var(--text-light);
        }
        .button-primary:hover:not(:disabled) {
            background-color: var(--primary-darker);
            box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
        }
        .button-secondary {
            background-color: var(--secondary);
            color: var(--text-light);
        }
        .button-secondary:hover:not(:disabled) {
            background-color: var(--secondary-darker);
            box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
        }

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    `,
})
export class ButtonComponent {
    type = input<'button' | 'submit' | 'reset'>('submit');
    kind = input<'primary' | 'secondary'>('primary');
    disabled = input<boolean>(false);

    context = computed(() => `button-${this.kind()}`);

    clicked = output<MouseEvent>();

    handleClick(event: MouseEvent) {
        if (!this.disabled()) {
            event.stopPropagation();

            this.clicked.emit(event);
        }
    }
}
