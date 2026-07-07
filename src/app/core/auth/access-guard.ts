import { CanActivateFn, Router } from '@angular/router';
import { Authentication } from './authentication';
import { inject } from '@angular/core';

export const accessGuard: CanActivateFn = (route, state) => {
    const authService = inject(Authentication);
    const router = inject(Router);

    if (authService.hasValidTokenInStorage()) return true;

    return router.createUrlTree(['auth/login']);
};
