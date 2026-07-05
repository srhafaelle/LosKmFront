import { ButtonComponent } from '@/shared/ui/button-component/button-component';
import { ModalComponent } from '@/shared/ui/modal-component/modal-component';
import { ThisReceiver } from '@angular/compiler';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-index',
    imports: [ButtonComponent, ModalComponent],
    templateUrl: './index.html',
    styleUrl: './index.css',
})
export class Index {
    isOpen = signal<boolean>(false);

    openModal() {
        console.log(this.isOpen());
        this.isOpen.update((value) => !value);
    }
}
