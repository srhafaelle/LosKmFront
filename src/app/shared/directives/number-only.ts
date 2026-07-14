import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
    selector: '[appNumberOnly]',
    host: {
        '(keydown)': 'onKeyDown($event)',
        '(paste)': 'onPaste($event)',
    },
})
export class NumberOnly {
    allowDecimals = input<boolean>(false);
    private el = inject(ElementRef<HTMLInputElement>);
    private navigationKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight',
        'Clear',
        'Copy',
        'Paste',
    ];

    onKeyDown(event: KeyboardEvent) {
        if (this.navigationKeys.includes(event.key)) return;

        if (
            this.allowDecimals() &&
            event.key === '.' &&
            !this.el.nativeElement.value.includes('.')
        ) {
            return;
        }

        if (isNaN(Number(event.key)) && event.key !== ' ') {
            event.preventDefault();
        }
    }

    onPaste(event: ClipboardEvent) {
        const pastedInput = event.clipboardData?.getData('text/plain') || '';

        if (!/^[0-9]+$/.test(pastedInput)) event.preventDefault();
    }
}
