import { Component, computed, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { bootstrapKey, bootstrapPerson } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
    selector: 'ui-input',
    imports: [NgIcon],
    templateUrl: './input-component.html',
    styleUrl: './input-component.css',
    viewProviders: [provideIcons({ bootstrapKey, bootstrapPerson })],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements ControlValueAccessor {
    label = input.required<string>();

    errorMessage = input<string | false>(false);
    placeholder = input<string>('');
    type = input<string>('text');

    icon = input<'bootstrapPerson' | 'bootstrapKey' | ''>('');
    hasIcon = computed(() => this.icon() !== '');

    // --- ControlValueAccessor Internal State ---
    value: string = '';
    isDisabled: boolean = false;

    // Callbacks to notify the parent form of changes
    onChange: any = () => {};
    onTouch: any = () => {};

    // 1. Writes a new value from the form model into the view
    writeValue(value: any): void {
        this.value = value || '';
    }

    // 2. Registers a callback function that is called when the control's value changes in the UI
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // 3. Registers a callback function that is called by the forms API on initialization to update the form model on blur
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    // 4. (Optional) Called when the form disables/enables the control
    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    // --- DOM Event Handlers ---
    onInput(event: Event): void {
        const val = (event.target as HTMLInputElement).value;
        this.value = val;
        this.onChange(val); // Send the new value back up to the parent form!
    }
}
