import { CanActivateFn } from '@angular/router';
import { Authentication } from './authentication';
import { inject } from '@angular/core';

export const accessGuard: CanActivateFn = (route, state) => {
    const authService = inject(Authentication);

    return authService.isAuthenticated();
};
