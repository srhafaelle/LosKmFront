import { Component, computed, input } from '@angular/core';
import { bootstrapKey, bootstrapPerson } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
    selector: 'ui-input',
    imports: [NgIcon],
    templateUrl: './input-component.html',
    styleUrl: './input-component.css',
    viewProviders: [provideIcons({ bootstrapKey, bootstrapPerson })],
})
export class InputComponent {
    placeholder = input.required<string>();
    type = input<string>('text');

    icon = input<'bootstrapPerson' | 'bootstrapKey' | ''>('');
    hasIcon = computed(() => !this.icon().includes(''));
}
