import { Component, computed, input, model, signal } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { lucideChevronUp } from '@ng-icons/lucide';

// Se puede enviar esta información a los archivos .d.ts que están en el directorio Types
export type SelectOption = {
    value: string;
    label: string;
};

@Component({
    selector: 'ui-select',
    imports: [ButtonComponent, NgIcon, OverlayModule],
    templateUrl: './select-component.html',
    styleUrl: './select-component.css',
    viewProviders: [provideIcons({ lucideChevronUp })],
})
export class SelectComponent {
    options = input<SelectOption[]>([]);
    placeholder = input.required<string>();

    selectedValue = model<SelectOption | null>(null);

    isOpen = signal<boolean>(false);
    searchTerm = signal<string>('');

    filteredOptions = computed(() => {
        const term = this.searchTerm().toLowerCase();
        return this.options().filter((opt) => opt.label.toLowerCase().includes(term));
    });

    toggleOpen() {
        this.isOpen.update((value) => !value);
        if (!this.isOpen()) {
            this.searchTerm.set('');
        }
    }

    onSearch(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.searchTerm.set(inputElement.value);
    }

    selectOption(option: SelectOption) {
        this.selectedValue.set(option);
        this.isOpen.set(false);
        this.searchTerm.set('');
    }

    closeDropdown() {
        this.isOpen.set(false);
        this.searchTerm.set('');
    }
}
