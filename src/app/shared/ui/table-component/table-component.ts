import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ui-table',
    imports: [],
    template: `
        <table class="corporate-table">
            <thead>
                <tr>
                    @for (item of headers(); track $index) {
                        <th>{{ item }}</th>
                    }
                </tr>
            </thead>
            <tbody>
                <ng-content></ng-content>
            </tbody>
        </table>
    `,
    styles: `
        .corporate-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;

            tr {
                transition: background-color 300ms ease-in;
            }
        }
        .corporate-table td {
            padding: 0.5rem 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border);
        }
        .corporate-table th {
            padding: 1rem;
            font-weight: 600;
            text-transform: uppercase;
            border-bottom: 1px solid var(--highlight-table);
            text-align: center;
        }

        .corporate-table tr:hover {
            background-color: var(--highlight-table-row);
        }
    `,
    encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
    headers = input.required<string[]>();
}
