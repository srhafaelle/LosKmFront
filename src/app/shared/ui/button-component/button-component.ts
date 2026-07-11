import { Component, computed, input, output } from '@angular/core';

export type ButtonProps = {
    type: 'button' | 'submit' | 'reset';
    kink: 'primary' | 'secondary' | 'system';
    disabled: boolean;
};

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
        .button-system {
            background-color: var(--bg-light);
            border: var(--border-card);
            color: var(--text);
        }
        .button-system:hover:not(:disabled) {
            background-color: var(--bg);
            box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
        }
        .button-destructive {
            background-color: var(--warning);
            border: var(--border-card);
            color: var(--text);
        }
        .button-destructive:hover:not(:disabled) {
            background-color: var(--bg);
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
    kind = input<'primary' | 'secondary' | 'system' | 'destructive'>('primary');
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
