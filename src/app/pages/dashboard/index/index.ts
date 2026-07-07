import { ButtonComponent, ModalComponent, SelectComponent } from '@/shared/ui';
import { ThisReceiver } from '@angular/compiler';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-index',
    imports: [ButtonComponent, ModalComponent, SelectComponent],
    templateUrl: './index.html',
    styleUrl: './index.css',
})
export class Index {
    isOpen = signal<boolean>(false);

    openModal() {
        this.isOpen.update((value) => !value);
    }
}
