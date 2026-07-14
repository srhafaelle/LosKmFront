import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    protected readonly http = inject(HttpClient);
    protected readonly baseUrl = '/api/v1';

    getAll() {
        return this.http.get(this.baseUrl);
    }
    getById(id: string) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    createProduct(payload) {
        return this.http.post(`${this.baseUrl}`, payload);
    }
    updateProduct(id: string, payload) {
        return this.http.put(`${this.baseUrl}/${id}`, payload);
    }
    transferProduct(id: string, payload) {
        return this.http.put(`${this.baseUrl}/${id}`, payload);
    }
}
