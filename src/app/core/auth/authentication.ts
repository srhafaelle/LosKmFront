import { User, LoginCredentials, AuthUser } from '@/types';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root',
})
export class Authentication {
    protected http = inject(HttpClient);
    protected readonly apiUrl = environment.apiUrl;

    #currentUser = signal<User | null>(this.getUserFromStorage());
    #bearer = signal<string | null>(null);

    currentUser = this.#currentUser.asReadonly();
    isAuthenticated = computed(() => !!this.#currentUser());

    login(payload: LoginCredentials) {
        return this.http.post<AuthUser>(`${this.apiUrl}/api/v1/auth/login`, payload).pipe(
            tap((authUser) => {
                const { token, ...user } = authUser;

                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('user_data', JSON.stringify(user));
                this.#currentUser.set(user);
            }),
        );
    }

    logout() {
        return this.http.post(`${this.apiUrl}/api/v1/logout`, {}).pipe(
            tap(() => {
                this.#bearer.set(null);
                localStorage.removeItem('user_data');
            }),
        );
    }

    // refreshToken() {
    //     const refreshToken = localStorage.getItem('refresh_token');
    //     return this.http.post<RefreshTokenResponse>(`${this.apiUrl}/api/v1/auth/refresh`, {
    //         refreshToken: refreshToken,
    //     });
    // }

    getBearerToken() {
        const token = this.getTokenFromStorage();

        if (!token) {
            throw new Error(`Missing token from storage!`);
        }

        return `Bearer ${token}`;
    }

    private getTokenFromStorage(): string | null {
        const data = localStorage.getItem('token');
        return data ? JSON.parse(data) : null;
    }

    private getUserFromStorage(): User | null {
        const data = localStorage.getItem('user_data');
        return data ? JSON.parse(data) : null;
    }
}
