import { User, type UserPayload } from '@/types';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    readonly #http = inject(HttpClient);
    readonly #baseUrl = '/api/v1/users';

    getAllUsers(): Observable<User[]> {
        return this.#http.get<User[]>(`${this.#baseUrl}`);
    }

    getUser(id: string): Observable<User> {
        return this.#http.get<User>(`${this.#baseUrl}/${id}`);
    }

    createUser(payload: UserPayload): Observable<User> {
        return this.#http.post<User>(`${this.#baseUrl}`, payload);
    }
}
