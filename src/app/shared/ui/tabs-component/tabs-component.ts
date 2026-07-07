import { Component, contentChildren, effect } from '@angular/core';
import { TabComponent } from './tab-component/tab-component';

@Component({
    selector: 'ui-tabs',
    template: `
        <div class="tabs-container">
            <div class="tab-headers">
                @for (tab of tabs(); track tab.title()) {
                    <button [class.active]="tab.active()" (click)="selectTab(tab)">
                        {{ tab.title() }}
                    </button>
                }
            </div>

            <div class="tab-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [
        `
            .tabs-container {
                font-family: var(--font-roboto-serif);
            }
            .tab-headers {
                display: flex;
                gap: 0.5rem;
                padding: 1rem;
                border-bottom: 1px solid var(--border);
                overflow-x: auto;
            }
            button {
                padding: 0.5rem 1rem;
                cursor: pointer;
                border: none;
                background: var(--bg-light);
                border-radius: var(--radius-default);
                transition: background-color 100ms ease-in;
            }
            button:hover {
                background-color: var(--primary);
            }
            button.active {
                background: var(--primary);
                color: var(--text);
                font-weight: 800;
            }
            .tab-content {
                padding: 20px;
                border: 1px solid #eee;
                border-radius: 8px;
            }
        `,
    ],
})
export class TabsComponent {
    // Automatically queries all projected <app-tab> components
    tabs = contentChildren(TabComponent);

    constructor() {
        // Automatically select the first tab when the component initializes
        // or when the tabs change
        effect(() => {
            const currentTabs = this.tabs();
            if (currentTabs.length > 0 && !currentTabs.some((t) => t.active())) {
                currentTabs[0].active.set(true);
            }
        });
    }

    selectTab(selectedTab: TabComponent) {
        // Set all tabs to inactive, then activate the clicked one
        this.tabs().forEach((tab) => tab.active.set(false));
        selectedTab.active.set(true);
    }
}
