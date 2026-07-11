import { Component, input, output } from '@angular/core';

@Component({
    selector: 'ui-modal',
    imports: [],
    template: `
        @if (isOpen()) {
            <div class="modal-backdrop" (click)="onBackdropClick($event)">
                <div class="modal-content" (click)="$event.stopPropagation()">
                    <header class="modal-header">
                        <ng-content select="[modal-header]"></ng-content>
                        <button class="close-btn" (click)="close.emit()">×</button>
                    </header>

                    <div class="modal-body">
                        <ng-content select="[modal-body]"></ng-content>
                    </div>
                </div>
            </div>
        }
    `,
    styles: `
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background: var(--bg);
            border-radius: var(--radius-default);
            width: 100%;
            overflow-y: auto;
            max-height: 48rem;
            max-width: 40rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
        }

        @media (max-width: 640px) {
            .modal-content {
                width: 90%;
            }
        }

        .modal-header {
            padding: 16px 24px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-body {
            padding: 24px;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        .close-btn:hover {
            color: #000;
        }
    `,
})
export class ModalComponent {
    isOpen = input.required<boolean>();
    close = output<void>();

    onBackdropClick(event: MouseEvent) {
        this.close.emit();
    }
}
