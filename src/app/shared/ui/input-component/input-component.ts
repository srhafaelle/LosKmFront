import {
    Component,
    computed,
    contentChild,
    forwardRef,
    input,
    ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { bootstrapKey, bootstrapPerson } from '@ng-icons/bootstrap-icons';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
    selector: 'ui-input',
    template: `
        <div class="label-container">
            <span>{{ label() }}</span>
            <div
                class="input-container"
                [class.has-icon]="hasIcon()"
                [class.error-container]="errorMessage()"
            >
                <ng-content select="ng-icon"></ng-content>
                <ng-content select="input"></ng-content>
            </div>
            @if (errorMessage()) {
                <span class="error-text">{{ errorMessage() }}</span>
            }
        </div>
    `,
    styles: `
        .input-container {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--bg-light);
            border: var(--border-card);
            border-color: var(--border);
            border-radius: var(--radius-default);
            box-shadow: var(--shadow-light);
            padding: 0rem 0.5rem;

            transition: border-color 300ms ease-in;
        }
        .input-container input {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            border: none;
            outline: none;
            padding: 0.5rem 0rem;
            background-color: transparent;
            width: 100%;
            color: var(--text);
        }

        .input-container:focus-within {
            border-color: var(--primary);
        }

        @media (prefers-color-scheme: dark) {
            .input-container:focus-within {
                border-color: var(--secondary-darker);
            }
        }

        .has-icon {
            gap: 1rem;
        }

        .icon-element {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        input {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            border: none;
            outline: none;
            padding: 0.5rem 0rem;
            background-color: transparent;
            width: 100%;
            color: var(--text);
        }

        .error-text {
            color: var(--warning);
        }

        .error-container {
            border-color: var(--warning);
        }
    `,
    encapsulation: ViewEncapsulation.None,
})
export class InputComponent {
    label = input.required<string>();
    errorMessage = input<string | false>(false);

    projectedIcon = contentChild(NgIconComponent);
    hasIcon = computed(() => this.projectedIcon() !== undefined);
}
