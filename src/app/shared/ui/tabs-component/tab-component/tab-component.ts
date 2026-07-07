import { Component, input, signal } from '@angular/core';

@Component({
    selector: 'ui-tab',
    template: `
        @if (active()) {
            <div class="tab-pane">
                <ng-content></ng-content>
            </div>
        }
    `,
})
export class TabComponent {
    title = input.required<string>();

    active = signal<boolean>(false);
}
