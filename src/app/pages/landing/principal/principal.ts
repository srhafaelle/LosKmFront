import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
    selector: 'app-principal',
    imports: [],
    templateUrl: './principal.html',
    styleUrl: './principal.css',
})
export class Principal implements OnInit {
    http = inject(HttpClient);

    ngOnInit() {
        this.http.get('/api/secrets').subscribe((data) => {
            console.log(`Secure data from the .env files`, data);
        });
    }
}
