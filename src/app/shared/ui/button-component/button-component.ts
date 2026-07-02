import { afterNextRender, Component, computed, input } from '@angular/core';

@Component({
    selector: 'ui-button',
    imports: [],
    templateUrl: './button-component.html',
    styleUrl: './button-component.css',
})
export class ButtonComponent {
    type = input<'button' | 'submit' | 'reset'>('submit');
    kind = input<'primary' | 'secondary'>('primary');

    context = computed(() => `button-${this.kind()}`);
}
