import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
    providedIn: 'root',
})
export class ResponsiveService {
    #breakpointObserver = inject(BreakpointObserver);

    #isMobile = signal<boolean>(false);

    isMobile = this.#isMobile.asReadonly();

    constructor() {
        this.#breakpointObserver.observe('(max-width: 639.99px)').subscribe((result) => {
            this.#isMobile.set(result.matches);
        });
    }
}
