import { Component, input, output } from '@angular/core';

@Component({
    selector: 'ui-modal',
    imports: [],
    templateUrl: './modal-component.html',
    styleUrl: './modal-component.css',
})
export class ModalComponent {
    isOpen = input.required<boolean>();
    close = output<void>();

    onBackdropClick(event: MouseEvent) {
        this.close.emit();
    }
}
