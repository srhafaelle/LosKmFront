import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    #isOpenSignal = signal<boolean>(false);

    isOpen = this.#isOpenSignal.asReadonly();

    toggleMenu(): void {
        this.#isOpenSignal.update((state) => !state);
    }

    closeMenu(): void {
        this.#isOpenSignal.set(false);
    }

    openMenu(): void {
        this.#isOpenSignal.set(true);
    }
}
