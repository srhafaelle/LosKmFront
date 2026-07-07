import { User, LoginCredentials, AuthUser, Auth } from '@/types';
import { HttpClient, HttpContext } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '@environments/environment';
import { BYPASS_AUTH } from './auth.context';

@Injectable({
    providedIn: 'root',
})
export class Authentication {
    protected http = inject(HttpClient);
    protected baseUrl = '/api/v1';

    #currentUser = signal<User | null>(this.getUserFromStorage());
    #bearer = signal<string | null>(this.getTokenFromStorage());

    currentUser = this.#currentUser.asReadonly();
    isAuthenticated = computed(() => !!this.#bearer());

    hasValidTokenInStorage(): boolean {
        return !!this.getTokenFromStorage();
    }

    login(payload: LoginCredentials) {
        return this.http
            .post<Auth>(`${this.baseUrl}/auth/login`, payload, {
                context: new HttpContext().set(BYPASS_AUTH, true),
            })
            .pipe(
                tap((authUser) => {
                    const { token } = authUser;

                    this.#bearer.set(token);
                    localStorage.setItem('token', JSON.stringify(token));
                    // localStorage.setItem('user_data', JSON.stringify(user));
                    // this.#currentUser.set(user);
                }),
            );
    }

    logout() {
        return this.http.post(`${this.baseUrl}/auth/logout`, {}).pipe(
            tap(() => {
                this.#bearer.set(null);
                this.#currentUser.set(null);

                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
            }),
        );
    }

    // refreshToken() {
    //     const refreshToken = localStorage.getItem('refresh_token');
    //     return this.http.post<RefreshTokenResponse>(`${this.apiUrl}/api/v1/auth/refresh`, {
    //         refreshToken: refreshToken,
    //     });
    // }

    /**
     *
     * @returns La representación del token en formato 'Bearer ...' para que pueda ser usado para nuevas peticiones HTTP
     */
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
